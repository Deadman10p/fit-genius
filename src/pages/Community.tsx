
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CalendarDays, Users, MessageSquare, Trophy, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Mock data - would normally come from an API
const leaderboardData = [
  { id: 1, name: 'Alex Johnson', points: 1250, streak: 30, avatar: '/placeholder.svg' },
  { id: 2, name: 'Sara Miller', points: 980, streak: 14, avatar: '/placeholder.svg' },
  { id: 3, name: 'John Davis', points: 875, streak: 21, avatar: '/placeholder.svg' },
  { id: 4, name: 'Emma Wilson', points: 760, streak: 10, avatar: '/placeholder.svg' },
  { id: 5, name: 'Michael Brown', points: 685, streak: 8, avatar: '/placeholder.svg' },
];

const eventsData = [
  {
    id: 1,
    title: 'Virtual 5K Challenge',
    date: '2025-04-20T09:00:00Z',
    participants: 124,
    description: 'Join our virtual 5K run and compete with fitness enthusiasts from around the world.'
  },
  {
    id: 2,
    title: 'Yoga for Beginners Workshop',
    date: '2025-04-25T18:30:00Z',
    participants: 56,
    description: 'Learn the basics of yoga in this beginner-friendly virtual workshop.'
  },
  {
    id: 3,
    title: 'Nutrition Masterclass',
    date: '2025-05-02T19:00:00Z',
    participants: 98,
    description: 'Join our nutrition expert to learn meal planning strategies for fitness success.'
  }
];

const forumTopics = [
  { id: 1, title: 'Best protein sources for vegans', author: 'GreenFitness', replies: 28, lastActivity: '2025-04-12T14:36:00Z' },
  { id: 2, title: 'How to stay motivated during winter', author: 'MotivatedRunner', replies: 42, lastActivity: '2025-04-13T09:22:00Z' },
  { id: 3, title: 'Recovery techniques after intense workouts', author: 'FitnessCoach', replies: 19, lastActivity: '2025-04-14T11:15:00Z' }
];

const Community = () => {
  const { t } = useLanguage();

  // Simulating API calls with React Query
  const { data: leaderboard = leaderboardData } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: () => Promise.resolve(leaderboardData),
    initialData: leaderboardData,
  });

  const { data: events = eventsData } = useQuery({
    queryKey: ['events'],
    queryFn: () => Promise.resolve(eventsData),
    initialData: eventsData,
  });

  const { data: forums = forumTopics } = useQuery({
    queryKey: ['forums'],
    queryFn: () => Promise.resolve(forumTopics),
    initialData: forumTopics,
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('community.title')}</h1>
        <p className="text-muted-foreground">{t('community.description')}</p>
      </div>

      <Tabs defaultValue="leaderboard">
        <TabsList className="mb-6">
          <TabsTrigger value="leaderboard" className="flex items-center">
            <Trophy className="mr-2 h-4 w-4" />
            {t('community.leaderboard')}
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4" />
            {t('community.events')}
          </TabsTrigger>
          <TabsTrigger value="forums" className="flex items-center">
            <MessageSquare className="mr-2 h-4 w-4" />
            {t('community.forums')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="leaderboard">
          <Card>
            <CardHeader>
              <CardTitle>{t('community.leaderboard')}</CardTitle>
              <CardDescription>Top performers in the FitGenius community</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="pb-3 text-left">{t('community.rank')}</th>
                      <th className="pb-3 text-left">{t('community.user')}</th>
                      <th className="pb-3 text-right">{t('community.points')}</th>
                      <th className="pb-3 text-right">{t('community.streak')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((user, index) => (
                      <tr key={user.id} className="border-b dark:border-gray-700">
                        <td className="py-4 text-lg font-bold text-primary dark:text-white">{index + 1}</td>
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium dark:text-white">{user.name}</span>
                          </div>
                        </td>
                        <td className="py-4 text-right font-semibold dark:text-white">{user.points.toLocaleString()}</td>
                        <td className="py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <span className="font-semibold dark:text-white">{user.streak}</span>
                            <span className="text-sm text-muted-foreground">days</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map(event => (
              <Card key={event.id} className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{event.participants}</span>
                      </div>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="mb-4">{event.description}</p>
                  <Button className="w-full">{t('community.joinEvent')}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="forums">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{t('community.forums')}</CardTitle>
                <Button size="sm">New Topic</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {forums.map(topic => (
                  <div key={topic.id} className="border-b dark:border-gray-700 pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold dark:text-white">{topic.title}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MessageSquare className="h-4 w-4" />
                        <span>{topic.replies}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        By <span className="font-medium">{topic.author}</span>
                      </span>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{formatDate(topic.lastActivity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button variant="outline">{t('community.viewAll')}</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Community;
