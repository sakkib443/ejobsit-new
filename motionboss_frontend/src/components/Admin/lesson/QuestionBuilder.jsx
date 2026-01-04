'use client';

import React, { useState } from 'react';
import {
    FiPlus, FiTrash2, FiEdit3, FiCheck, FiX, FiHelpCircle,
    FiList, FiMessageSquare, FiChevronDown, FiChevronUp, FiMove
} from 'react-icons/fi';

/**
 * Professional Question Builder Component
 * MCQ এবং Short Answer প্রশ্ন তৈরির জন্য
 */
export default function QuestionBuilder({ questions = [], onChange }) {
    const [showForm, setShowForm] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [formData, setFormData] = useState({
        type: 'mcq',
        question: '',
        questionBn: '',
        options: [
            { text: '', textBn: '', isCorrect: false },
            { text: '', textBn: '', isCorrect: false },
        ],
        correctAnswer: '',
        correctAnswerBn: '',
        points: 1,
        explanation: '',
        explanationBn: '',
        hint: '',
        hintBn: '',
        order: questions.length + 1,
        isRequired: true,
    });

    const resetForm = () => {
        setFormData({
            type: 'mcq',
            question: '',
            questionBn: '',
            options: [
                { text: '', textBn: '', isCorrect: false },
                { text: '', textBn: '', isCorrect: false },
            ],
            correctAnswer: '',
            correctAnswerBn: '',
            points: 1,
            explanation: '',
            explanationBn: '',
            hint: '',
            hintBn: '',
            order: questions.length + 1,
            isRequired: true,
        });
        setEditingIndex(null);
        setShowForm(false);
    };

    const handleAddOption = () => {
        if (formData.options.length < 6) {
            setFormData(prev => ({
                ...prev,
                options: [...prev.options, { text: '', textBn: '', isCorrect: false }]
            }));
        }
    };

    const handleRemoveOption = (index) => {
        if (formData.options.length > 2) {
            setFormData(prev => ({
                ...prev,
                options: prev.options.filter((_, i) => i !== index)
            }));
        }
    };

    const handleOptionChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            options: prev.options.map((opt, i) =>
                i === index ? { ...opt, [field]: value } :
                    field === 'isCorrect' && value === true ? { ...opt, isCorrect: false } : opt
            )
        }));
    };

    const handleSaveQuestion = () => {
        if (!formData.question.trim()) {
            alert('Please enter a question');
            return;
        }

        if (formData.type === 'mcq') {
            const hasCorrect = formData.options.some(opt => opt.isCorrect);
            const allFilled = formData.options.every(opt => opt.text.trim());
            if (!hasCorrect || !allFilled) {
                alert('Please fill all options and mark one as correct');
                return;
            }
        } else if (!formData.correctAnswer.trim()) {
            alert('Please enter the correct answer');
            return;
        }

        const newQuestion = {
            ...formData,
            order: editingIndex !== null ? formData.order : questions.length + 1
        };

        if (editingIndex !== null) {
            const updated = [...questions];
            updated[editingIndex] = newQuestion;
            onChange(updated);
        } else {
            onChange([...questions, newQuestion]);
        }

        resetForm();
    };

    const handleEdit = (index) => {
        setFormData(questions[index]);
        setEditingIndex(index);
        setShowForm(true);
    };

    const handleDelete = (index) => {
        if (confirm('Are you sure you want to delete this question?')) {
            onChange(questions.filter((_, i) => i !== index));
        }
    };

    const inputClass = "w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none text-sm transition-all bg-white text-slate-700";

    return (
        <div className="space-y-4">
            {/* Questions List */}
            {questions.length > 0 && (
                <div className="space-y-3">
                    {questions.map((q, index) => (
                        <div
                            key={index}
                            className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition-all"
                        >
                            <div
                                className="flex items-center justify-between p-4 cursor-pointer"
                                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${q.type === 'mcq' ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'
                                        }`}>
                                        {q.type === 'mcq' ? <FiList size={18} /> : <FiMessageSquare size={18} />}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-800 text-sm line-clamp-1">
                                            {index + 1}. {q.question}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            {q.type === 'mcq' ? `MCQ • ${q.options?.length} options` : 'Short Answer'} • {q.points} pts
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); handleEdit(index); }}
                                        className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-indigo-600 transition-colors"
                                    >
                                        <FiEdit3 size={16} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); handleDelete(index); }}
                                        className="p-2 hover:bg-red-50 rounded-lg text-slate-500 hover:text-red-600 transition-colors"
                                    >
                                        <FiTrash2 size={16} />
                                    </button>
                                    {expandedIndex === index ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
                                </div>
                            </div>

                            {/* Expanded Content */}
                            {expandedIndex === index && (
                                <div className="px-4 pb-4 border-t border-slate-100 pt-3">
                                    {q.type === 'mcq' ? (
                                        <div className="space-y-2">
                                            {q.options?.map((opt, i) => (
                                                <div
                                                    key={i}
                                                    className={`flex items-center gap-2 p-2.5 rounded-lg text-sm ${opt.isCorrect ? 'bg-emerald-50 text-emerald-700 font-medium' : 'bg-slate-50 text-slate-600'
                                                        }`}
                                                >
                                                    {opt.isCorrect && <FiCheck className="text-emerald-500" size={16} />}
                                                    <span>{opt.text}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-3 bg-emerald-50 rounded-lg text-emerald-700 text-sm">
                                            <span className="font-medium">Correct Answer:</span> {q.correctAnswer}
                                        </div>
                                    )}
                                    {q.explanation && (
                                        <div className="mt-3 p-3 bg-blue-50 rounded-lg text-blue-700 text-sm">
                                            <span className="font-medium">Explanation:</span> {q.explanation}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Add Question Form */}
            {showForm ? (
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-2xl border border-indigo-100 space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-800">
                            {editingIndex !== null ? 'Edit Question' : 'Add New Question'}
                        </h4>
                        <button
                            type="button"
                            onClick={resetForm}
                            className="p-2 hover:bg-slate-100 rounded-lg text-slate-500"
                        >
                            <FiX size={18} />
                        </button>
                    </div>

                    {/* Question Type */}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, type: 'mcq' }))}
                            className={`flex-1 p-3 rounded-xl border-2 flex items-center justify-center gap-2 font-semibold text-sm transition-all ${formData.type === 'mcq'
                                    ? 'border-indigo-500 bg-indigo-500 text-white'
                                    : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-300'
                                }`}
                        >
                            <FiList size={18} /> MCQ
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, type: 'short' }))}
                            className={`flex-1 p-3 rounded-xl border-2 flex items-center justify-center gap-2 font-semibold text-sm transition-all ${formData.type === 'short'
                                    ? 'border-emerald-500 bg-emerald-500 text-white'
                                    : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-300'
                                }`}
                        >
                            <FiMessageSquare size={18} /> Short Answer
                        </button>
                    </div>

                    {/* Question Text */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-semibold text-slate-600 mb-1 block">Question (English) *</label>
                            <textarea
                                value={formData.question}
                                onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
                                placeholder="Enter your question..."
                                rows={3}
                                className={`${inputClass} resize-none`}
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-slate-600 mb-1 block">Question (বাংলা)</label>
                            <textarea
                                value={formData.questionBn}
                                onChange={(e) => setFormData(prev => ({ ...prev, questionBn: e.target.value }))}
                                placeholder="প্রশ্ন লিখুন..."
                                rows={3}
                                className={`${inputClass} resize-none`}
                            />
                        </div>
                    </div>

                    {/* MCQ Options */}
                    {formData.type === 'mcq' && (
                        <div className="space-y-3">
                            <label className="text-xs font-semibold text-slate-600">Options (2-6)</label>
                            {formData.options.map((opt, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => handleOptionChange(index, 'isCorrect', true)}
                                        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${opt.isCorrect
                                                ? 'bg-emerald-500 text-white'
                                                : 'bg-white border border-slate-200 text-slate-400 hover:border-emerald-300'
                                            }`}
                                    >
                                        <FiCheck size={16} />
                                    </button>
                                    <input
                                        type="text"
                                        value={opt.text}
                                        onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
                                        placeholder={`Option ${index + 1}`}
                                        className={`${inputClass} flex-1`}
                                    />
                                    <input
                                        type="text"
                                        value={opt.textBn}
                                        onChange={(e) => handleOptionChange(index, 'textBn', e.target.value)}
                                        placeholder="বাংলা"
                                        className={`${inputClass} w-32`}
                                    />
                                    {formData.options.length > 2 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveOption(index)}
                                            className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500"
                                        >
                                            <FiTrash2 size={16} />
                                        </button>
                                    )}
                                </div>
                            ))}
                            {formData.options.length < 6 && (
                                <button
                                    type="button"
                                    onClick={handleAddOption}
                                    className="flex items-center gap-2 text-indigo-600 text-sm font-semibold hover:text-indigo-700"
                                >
                                    <FiPlus size={16} /> Add Option
                                </button>
                            )}
                        </div>
                    )}

                    {/* Short Answer */}
                    {formData.type === 'short' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs font-semibold text-slate-600 mb-1 block">Correct Answer *</label>
                                <input
                                    type="text"
                                    value={formData.correctAnswer}
                                    onChange={(e) => setFormData(prev => ({ ...prev, correctAnswer: e.target.value }))}
                                    placeholder="Enter correct answer"
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-slate-600 mb-1 block">Correct Answer (বাংলা)</label>
                                <input
                                    type="text"
                                    value={formData.correctAnswerBn}
                                    onChange={(e) => setFormData(prev => ({ ...prev, correctAnswerBn: e.target.value }))}
                                    placeholder="সঠিক উত্তর"
                                    className={inputClass}
                                />
                            </div>
                        </div>
                    )}

                    {/* Points & Explanation */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                            <label className="text-xs font-semibold text-slate-600 mb-1 block">Points</label>
                            <input
                                type="number"
                                value={formData.points}
                                onChange={(e) => setFormData(prev => ({ ...prev, points: Number(e.target.value) }))}
                                min="1"
                                max="100"
                                className={inputClass}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-xs font-semibold text-slate-600 mb-1 block">Explanation (shown after answer)</label>
                            <input
                                type="text"
                                value={formData.explanation}
                                onChange={(e) => setFormData(prev => ({ ...prev, explanation: e.target.value }))}
                                placeholder="Explain the correct answer..."
                                className={inputClass}
                            />
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={resetForm}
                            className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSaveQuestion}
                            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm flex items-center gap-2"
                        >
                            <FiCheck size={16} />
                            {editingIndex !== null ? 'Update Question' : 'Add Question'}
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => setShowForm(true)}
                    className="w-full p-4 border-2 border-dashed border-indigo-200 rounded-2xl text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 font-semibold"
                >
                    <FiPlus size={20} />
                    Add Question
                </button>
            )}
        </div>
    );
}
