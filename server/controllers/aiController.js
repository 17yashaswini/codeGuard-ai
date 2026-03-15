import groq from '../config/groq.js';
import User from '../models/User.js';
import Analysis from '../models/Analysis.js';

export const analyzeCode = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({ success: false, message: 'Code and language are required' });
    }

    const user = await User.findOne({ clerkId: req.user.id });

    if (user.credits <= 0) {
      return res.status(403).json({ success: false, message: 'No credits remaining' });
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a senior software engineer and security expert. Analyze code for security vulnerabilities, bugs, performance issues and best practice violations. For each issue provide: issue name, severity (critical/high/medium/low), line number if possible, clear explanation, and how to fix it. Format your response in a clear structured way.'
        },
        {
          role: 'user',
          content: `Analyze this ${language} code:\n\n${code}`
        }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.3,
      max_tokens: 2048,
    });

    const result = chatCompletion.choices[0]?.message?.content || 'No analysis available';

    const severity = result.toLowerCase().includes('critical') ? 'critical'
      : result.toLowerCase().includes('high') ? 'high'
      : result.toLowerCase().includes('medium') ? 'medium'
      : 'low';

    const analysis = await Analysis.create({
      userId: req.user.id,
      code,
      language,
      result,
      severity,
    });

    user.credits -= 1;
    await user.save();

    res.status(200).json({ success: true, result, severity, credits: user.credits, analysisId: analysis._id });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getHistory = async (req, res) => {
  try {
    const analyses = await Analysis.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, analyses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};