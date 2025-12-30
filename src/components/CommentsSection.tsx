import { useState } from 'react';
import { Comment } from '@/types/photo';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Send, User } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface CommentsSectionProps {
  comments: Comment[];
  currentUserEmail: string;
  onAddComment: (text: string) => void;
}

export const CommentsSection = ({ comments, currentUserEmail, onAddComment }: CommentsSectionProps) => {
  const [newComment, setNewComment] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = () => {
    if (!newComment.trim()) return;
    onAddComment(newComment.trim());
    setNewComment('');
  };

  const getUserName = (email: string) => {
    return email.split('@')[0];
  };

  return (
    <div className="space-y-3">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <MessageCircle className="w-4 h-4" />
        <span>
          {comments.length === 0
            ? 'Adicionar comentário'
            : `${comments.length} comentário${comments.length !== 1 ? 's' : ''}`}
        </span>
      </button>

      {isExpanded && (
        <div className="space-y-3 animate-fade-in">
          {/* Comments list */}
          {comments.length > 0 && (
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className={`p-2 rounded-lg text-sm ${
                    comment.userEmail === currentUserEmail
                      ? 'bg-primary/10 ml-4'
                      : 'bg-secondary/50 mr-4'
                  }`}
                >
                  <div className="flex items-center gap-1 mb-1">
                    <User className="w-3 h-3" />
                    <span className="font-medium capitalize text-xs">
                      {getUserName(comment.userEmail)}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      · {format(new Date(comment.createdAt), "d MMM, HH:mm", { locale: ptBR })}
                    </span>
                  </div>
                  <p className="text-foreground">{comment.text}</p>
                </div>
              ))}
            </div>
          )}

          {/* Add comment */}
          <div className="flex gap-2">
            <Textarea
              placeholder="Escreva um comentário..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[60px] text-sm"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={!newComment.trim()}
              className="h-auto"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
