import { ActivityItem } from '@/types/photo';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Camera, Heart, MessageCircle, User, Clock } from 'lucide-react';

interface ActivityLogProps {
  activities: ActivityItem[];
  onViewPhoto?: (photoId: string) => void;
}

export const ActivityLog = ({ activities, onViewPhoto }: ActivityLogProps) => {
  const getUserName = (email: string) => {
    return email.split('@')[0];
  };

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'photo_added':
        return <Camera className="w-4 h-4 text-primary" />;
      case 'comment_added':
        return <MessageCircle className="w-4 h-4 text-accent" />;
      case 'photo_favorited':
        return <Heart className="w-4 h-4 text-primary fill-primary" />;
    }
  };

  const getActivityText = (activity: ActivityItem) => {
    const userName = getUserName(activity.userEmail);
    switch (activity.type) {
      case 'photo_added':
        return (
          <>
            <span className="font-medium capitalize">{userName}</span> adicionou{' '}
            {activity.photoTitle ? (
              <span className="font-medium">"{activity.photoTitle}"</span>
            ) : (
              'uma nova foto'
            )}
          </>
        );
      case 'comment_added':
        return (
          <>
            <span className="font-medium capitalize">{userName}</span> comentou:{' '}
            <span className="text-muted-foreground">"{activity.commentText?.substring(0, 50)}..."</span>
          </>
        );
      case 'photo_favorited':
        return (
          <>
            <span className="font-medium capitalize">{userName}</span> favoritou{' '}
            {activity.photoTitle ? (
              <span className="font-medium">"{activity.photoTitle}"</span>
            ) : (
              'uma foto'
            )}
          </>
        );
    }
  };

  if (activities.length === 0) {
    return (
      <div className="text-center py-12">
        <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">Nenhuma atividade ainda</p>
        <p className="text-sm text-muted-foreground mt-1">
          As atividades aparecerão aqui quando fotos forem adicionadas
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {activities.map((activity) => (
        <Card
          key={activity.id}
          className={`p-4 ${activity.photoId && onViewPhoto ? 'cursor-pointer hover:bg-secondary/50 transition-colors' : ''}`}
          onClick={() => activity.photoId && onViewPhoto?.(activity.photoId)}
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">
                {getActivityText(activity)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {format(new Date(activity.createdAt), "d 'de' MMMM 'às' HH:mm", { locale: ptBR })}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
