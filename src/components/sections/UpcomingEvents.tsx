
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Heart, Gift, Sparkles, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUpcomingSpecialEvents } from "@/hooks/useSpecialDraws";

const UpcomingEvents = () => {
  const navigate = useNavigate();
  const { data: upcomingEvents, isLoading } = useUpcomingSpecialEvents();

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'vendredi13': return <Sparkles className="w-4 h-4" />;
      case 'saint-valentin': return <Heart className="w-4 h-4" />;
      case 'noel': return <Gift className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getEventColor = (eventType: string) => {
    switch (eventType) {
      case 'vendredi13': return 'bg-black text-white';
      case 'saint-valentin': return 'bg-red-500 text-white';
      case 'noel': return 'bg-green-600 text-white';
      default: return 'bg-blue-600 text-white';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntil = (dateString: string) => {
    const eventDate = new Date(dateString);
    const now = new Date();
    const diffTime = eventDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (isLoading) {
    return (
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <Card className="bg-white/95 border-2 border-yellow-400">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="animate-spin w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"></div>
                <p className="text-blue-600">Chargement des événements...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  if (!upcomingEvents || upcomingEvents.length === 0) {
    return null;
  }

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto">
        <Card className="bg-white/95 border-2 border-yellow-400 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-blue-900">
            <CardTitle className="text-xl flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Prochains Événements Exceptionnels
            </CardTitle>
            <CardDescription className="text-blue-800">
              Ne manquez pas les super-tirages avec des jackpots exceptionnels
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {upcomingEvents.slice(0, 3).map((event: any, index: number) => {
                const daysUntil = getDaysUntil(event.date);
                
                return (
                  <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-yellow-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-4">
                      <Badge className={`${getEventColor(event.eventType)} font-medium`}>
                        {getEventIcon(event.eventType)}
                        <span className="ml-2">{event.eventName}</span>
                      </Badge>
                      <div>
                        <div className="font-medium text-blue-900">{formatDate(event.date)}</div>
                        <div className="text-sm text-blue-600">{event.description}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm text-blue-600 mb-1">
                        <Clock className="w-4 h-4 mr-1" />
                        dans {daysUntil} jour{daysUntil > 1 ? 's' : ''}
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-300">
                        Jackpot exceptionnel
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 text-center">
              <Button 
                onClick={() => navigate('/special-draws')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
              >
                Voir tous les tirages exceptionnels
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default UpcomingEvents;
