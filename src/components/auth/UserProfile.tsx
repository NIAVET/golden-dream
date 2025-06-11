
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, User } from 'lucide-react';

const UserProfile = () => {
  const { user, signOut } = useAuth();

  if (!user) return null;

  const getInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  return (
    <div className="flex items-center space-x-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={user.user_metadata?.avatar_url} />
        <AvatarFallback className="bg-blue-100 text-blue-800">
          {getInitials(user.email || 'U')}
        </AvatarFallback>
      </Avatar>
      
      <div className="hidden md:block">
        <p className="text-sm font-medium text-white">
          {user.user_metadata?.full_name || user.email}
        </p>
      </div>
      
      <Button
        onClick={signOut}
        variant="ghost"
        size="sm"
        className="text-white hover:bg-white/10"
      >
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:ml-2 sm:inline">Déconnexion</span>
      </Button>
    </div>
  );
};

export default UserProfile;
