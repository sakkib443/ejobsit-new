'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiHelpCircle, FiCheck, FiX, FiChevronLeft, FiChevronRight,
    FiRefreshCw, FiAward, FiAlertCircle, FiClock, FiList
} from 'react-icons/fi';
import toast from 'react-hot-toast';

/**
 * Quiz Component for Students
 * Displays MCQ and Short answer questions with grading
 */
export default function LessonQuiz({ lessonId, questions = [], quizSettings = {}, onComplete }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(null);

    const BASE_URL = 'https://motionboss-backend.vercel.app/api';

    // Timer for quiz
    useEffect(() => {
        if (quizSettings.timeLimit && quizSettings.timeLimit > 0 && !submitted) {
            setTimeRemaining(quizSettings.timeLimit * 60); // Convert to seconds
        }
    }, [quizSettings.timeLimit, submitted]);

    useEffect(() => {
        if (timeRemaining === null || submitted) return;

        if (timeRemaining <= 0) {
            handleSubmit();
            return;
        }

        const timer = setTimeout(() => {
            setTimeRemaining(prev => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeRemaining, submitted]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (!questions || questions.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FiHelpCircle size={28} className="text-slate-400" />
                </div>
                <p className="text-slate-500 font-medium">No quiz available for this lesson</p>
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex + 1) / questions.length) * 100;
    const answeredCount = Object.keys(answers).length;

    const handleAnswer = (questionId, answer) => {
        if (submitted) return;
        setAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const handleSubmit = async () => {
        if (answeredCount < questions.length) {
            const confirm = window.confirm(`You have only answered ${answeredCount} of ${questions.length} questions. Submit anyway?`);
            if (!confirm) return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
                questionId,
                answer,
            }));

            const res = await fetch(`${BASE_URL}/lessons/${lessonId}/quiz/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ answers: formattedAnswers }),
            });

            const data = await res.json();

            if (res.ok) {
                setResult(data.data);
                setSubmitted(true);
                if (data.data.passed) {
                    toast.success('🎉 Congratulations! You passed the quiz!');
                } else {
                    toast('Keep practicing! You can retry the quiz.');
                }
                if (onComplete) onComplete(data.data);
            } else {
                toast.error(data.message || 'Failed to submit quiz');
            }
        } catch (err) {
            console.error('Quiz submit error:', err);
            toast.error('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleRetry = () => {
        setAnswers({});
        setSubmitted(false);
        setResult(null);
        setCurrentIndex(0);
        if (quizSettings.timeLimit) {
            setTimeRemaining(quizSettings.timeLimit * 60);
        }
    };

    // Result Screen
    if (submitted && result) {
        return (
            <div className="space-y-6">
                {/* Result Card */}
                <div className={`p-8 rounded-2xl text-center ${result.passed
                        ? 'bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100'
                        : 'bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100'
                    }`}>
                    <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${result.passed
                            ? 'bg-gradient-to-br from-emerald-400 to-green-500 shadow-lg shadow-emerald-200'
                            : 'bg-gradient-to-br from-orange-400 to-amber-500 shadow-lg shadow-orange-200'
                        }`}>
                        {result.passed ? (
                            <FiAward size={36} className="text-white" />
                        ) : (
                            <FiAlertCircle size={36} className="text-white" />
                        )}
                    </div>

                    <h3 className={`text-2xl font-bold mb-2 font-outfit ${result.passed ? 'text-emerald-800' : 'text-orange-800'
                        }`}>
                        {result.passed ? 'Congratulations!' : 'Keep Learning!'}
                    </h3>

                    <p className={`text-sm mb-6 ${result.passed ? 'text-emerald-600' : 'text-orange-600'}`}>
                        {result.passed
                            ? 'You have successfully passed this quiz!'
                            : `You need ${quizSettings.passingScore || 70}% to pass. Try again!`}
                    </p>

                    {/* Score Display */}
                    <div className="flex items-center justify-center gap-8 mb-6">
                        <div className="text-center">
                            <p className="text-4xl font-bold text-slate-800">{result.percentage}%</p>
                            <p className="text-sm text-slate-500">Score</p>
                        </div>
                        <div className="h-12 w-px bg-slate-200"></div>
                        <div className="text-center">
                            <p className="text-4xl font-bold text-slate-800">{result.score}/{result.totalPoints}</p>
                            <p className="text-sm text-slate-500">Points</p>
                        </div>
                    </div>

                    {/* Retry Button */}
                    {!result.passed && (quizSettings.maxAttempts === 0 || true) && (
                        <button
                            onClick={handleRetry}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:shadow-lg hover:shadow-indigo-200 transition-all"
                        >
                            <FiRefreshCw size={18} />
                            Retry Quiz
                        </button>
                    )}
                </div>

                {/* Answer Review */}
                {result.results && (
                    <div className="space-y-3">
                        <h4 className="font-bold text-slate-700">Answer Review</h4>
                        {result.results.map((r, idx) => {
                            const question = questions.find(q => q._id === r.questionId);
                            return (
                                <div
                                    key={r.questionId}
                                    className={`p-4 rounded-xl border ${r.correct
                                            ? 'bg-emerald-50 border-emerald-100'
                                            : 'bg-red-50 border-red-100'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${r.correct ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                                            }`}>
                                            {r.correct ? <FiCheck size={16} /> : <FiX size={16} />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-slate-800 text-sm">
                                                {idx + 1}. {question?.question}
                                            </p>
                                            <p className="text-xs text-slate-500 mt-1">
                                                Your answer: <span className="font-medium">{r.userAnswer || 'Not answered'}</span>
                                            </p>
                                            {!r.correct && r.correctAnswer && (
                                                <p className="text-xs text-emerald-600 mt-1">
                                                    Correct answer: <span className="font-medium">{r.correctAnswer}</span>
                                                </p>
                                            )}
                                        </div>
                                        <span className="text-sm font-bold text-slate-500">
                                            {r.earnedPoints}/{r.points}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Quiz Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-200">
                        <FiHelpCircle size={20} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-800">Quiz</h3>
                        <p className="text-xs text-slate-500">Question {currentIndex + 1} of {questions.length}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {timeRemaining !== null && (
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-sm font-bold ${timeRemaining < 60 ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'
                            }`}>
                            <FiClock size={14} />
                            {formatTime(timeRemaining)}
                        </div>
                    )}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-sm font-semibold">
                        <FiList size={14} />
                        {answeredCount}/{questions.length}
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white rounded-2xl border border-slate-100 shadow-lg shadow-slate-100/50 p-6"
                >
                    {/* Question Text */}
                    <div className="mb-6">
                        <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold mb-3 ${currentQuestion.type === 'mcq'
                                ? 'bg-indigo-100 text-indigo-600'
                                : 'bg-amber-100 text-amber-600'
                            }`}>
                            {currentQuestion.type === 'mcq' ? 'Multiple Choice' : 'Short Answer'}
                        </span>
                        <h4 className="text-lg font-semibold text-slate-800 leading-relaxed">
                            {currentQuestion.question}
                        </h4>
                        {currentQuestion.hint && (
                            <p className="text-sm text-indigo-500 mt-2 flex items-center gap-1">
                                💡 Hint: {currentQuestion.hint}
                            </p>
                        )}
                    </div>

                    {/* MCQ Options */}
                    {currentQuestion.type === 'mcq' && currentQuestion.options && (
                        <div className="space-y-3">
                            {currentQuestion.options.map((option, idx) => {
                                const isSelected = answers[currentQuestion._id] === option._id;
                                return (
                                    <button
                                        key={option._id || idx}
                                        onClick={() => handleAnswer(currentQuestion._id, option._id)}
                                        className={`w-full p-4 rounded-xl border-2 text-left flex items-center gap-4 transition-all ${isSelected
                                                ? 'border-indigo-500 bg-indigo-50'
                                                : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                            }`}
                                    >
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${isSelected
                                                ? 'bg-indigo-500 text-white'
                                                : 'bg-slate-100 text-slate-500'
                                            }`}>
                                            {String.fromCharCode(65 + idx)}
                                        </div>
                                        <span className={`flex-1 font-medium ${isSelected ? 'text-indigo-700' : 'text-slate-700'
                                            }`}>
                                            {option.text}
                                        </span>
                                        {isSelected && (
                                            <FiCheck className="text-indigo-500" size={20} />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {/* Short Answer */}
                    {currentQuestion.type === 'short' && (
                        <div>
                            <textarea
                                value={answers[currentQuestion._id] || ''}
                                onChange={(e) => handleAnswer(currentQuestion._id, e.target.value)}
                                placeholder="Type your answer here..."
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none text-slate-700 resize-none transition-all"
                            />
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between">
                <button
                    onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                    disabled={currentIndex === 0}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FiChevronLeft size={18} />
                    Previous
                </button>

                <div className="flex items-center gap-1">
                    {questions.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`w-3 h-3 rounded-full transition-all ${idx === currentIndex
                                    ? 'bg-indigo-500 scale-125'
                                    : answers[questions[idx]._id]
                                        ? 'bg-indigo-300'
                                        : 'bg-slate-200'
                                }`}
                        />
                    ))}
                </div>

                {currentIndex === questions.length - 1 ? (
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:shadow-lg hover:shadow-indigo-200 transition-all disabled:opacity-50"
                    >
                        {loading ? 'Submitting...' : 'Submit Quiz'}
                        <FiCheck size={18} />
                    </button>
                ) : (
                    <button
                        onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                        className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 text-white font-semibold hover:bg-slate-900 transition-all"
                    >
                        Next
                        <FiChevronRight size={18} />
                    </button>
                )}
            </div>
        </div>
    );
}
