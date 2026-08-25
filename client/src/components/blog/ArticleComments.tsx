import React, { useState } from 'react';
import { MessageSquare, Send, ThumbsUp } from 'lucide-react';
import { BlurFade } from '../ui/BlurFade';
import { Card, CardContent } from '../ui/card';
import { Avatar } from '../ui/avatar';
import { Button } from '../ui/Button';

export interface CommentItem {
  id: string;
  name: string;
  avatar?: string;
  date: string;
  text: string;
  likes: number;
}

interface ArticleCommentsProps {
  articleId: string;
  articleTitle: string;
}

export const ArticleComments: React.FC<ArticleCommentsProps> = ({ articleId, articleTitle }) => {
  const [comments, setComments] = useState<CommentItem[]>([
    {
      id: 'c1',
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      date: '2 hours ago',
      text: 'Great breakdown of distributed event streaming! The section on partition balancing helped me solve a rebalance storm we were facing in production.',
      likes: 12,
    },
    {
      id: 'c2',
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      date: '5 hours ago',
      text: 'Would love to see a follow-up article comparing Kafka log compaction vs Redis Streams memory limits under 100k msg/sec workloads.',
      likes: 8,
    },
    {
      id: 'c3',
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      date: '1 day ago',
      text: 'Clear, concise, and zero fluff. Appreciate the real-world Go code examples!',
      likes: 5,
    },
  ]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !text) return;

    const newComment: CommentItem = {
      id: `c-${Date.now()}`,
      name: name,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
      date: 'Just now',
      text: text,
      likes: 0,
    };

    setComments([newComment, ...comments]);
    setName('');
    setEmail('');
    setText('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleLike = (id: string) => {
    setComments(
      comments.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  return (
    <section className="mt-16 pt-10 border-t border-[#E1E1E1] dark:border-[#2C2C30]">
      <BlurFade delay={0.1} yOffset={16}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#1C1C1E] dark:text-[#F6F5F0]" />
            <h3 className="font-display font-semibold text-xl text-[#1C1C1E] dark:text-[#F6F5F0]">
              Discussion & Comments ({comments.length})
            </h3>
          </div>
          <span className="text-xs font-mono text-[#7E8798]">
            High-signal community forum
          </span>
        </div>

        {/* Comment Submission Form */}
        <Card className="p-6 mb-10">
          <CardContent className="p-0">
            <h4 className="font-display font-semibold text-sm text-[#1C1C1E] dark:text-[#F6F5F0] mb-3">
              Join the conversation
            </h4>

            {submitted && (
              <div className="p-3 mb-4 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs rounded-xl font-medium">
                Comment posted successfully! Thank you for contributing.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-sans text-[#4C586F] dark:text-[#A0A9B8] mb-1 font-medium">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Linus Torvalds"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#F6F5F0] dark:bg-[#141416] border border-[#E1E1E1] dark:border-[#2C2C30] text-[#1C1C1E] dark:text-[#F6F5F0] placeholder-[#7E8798] focus:outline-none focus:ring-1 focus:ring-[#1C1C1E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans text-[#4C586F] dark:text-[#A0A9B8] mb-1 font-medium">
                    Work Email (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="linus@linux.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#F6F5F0] dark:bg-[#141416] border border-[#E1E1E1] dark:border-[#2C2C30] text-[#1C1C1E] dark:text-[#F6F5F0] placeholder-[#7E8798] focus:outline-none focus:ring-1 focus:ring-[#1C1C1E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-sans text-[#4C586F] dark:text-[#A0A9B8] mb-1 font-medium">
                  Your Thoughts / Question *
                </label>
                <textarea
                  rows={3}
                  placeholder="Share your perspective or ask a technical question..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 text-xs rounded-xl bg-[#F6F5F0] dark:bg-[#141416] border border-[#E1E1E1] dark:border-[#2C2C30] text-[#1C1C1E] dark:text-[#F6F5F0] placeholder-[#7E8798] focus:outline-none focus:ring-1 focus:ring-[#1C1C1E] resize-none"
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" size="default">
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Comment</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Existing Comments List */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <Card key={comment.id} className="p-5">
              <CardContent className="p-0 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar src={comment.avatar} alt={comment.name} size="md" />
                    <div>
                      <div className="font-display font-semibold text-xs text-[#1C1C1E] dark:text-[#F6F5F0]">
                        {comment.name}
                      </div>
                      <div className="text-[11px] font-mono text-[#7E8798]">
                        {comment.date}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleLike(comment.id)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs text-[#7E8798] hover:text-[#1C1C1E] dark:hover:text-white bg-[#F6F5F0] dark:bg-[#141416] border border-[#E1E1E1] dark:border-[#2C2C30] transition-colors cursor-pointer"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>{comment.likes}</span>
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-[#4C586F] dark:text-[#A0A9B8] leading-relaxed font-sans pl-12">
                  {comment.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </BlurFade>
    </section>
  );
};
