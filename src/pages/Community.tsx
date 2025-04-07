
import React from 'react';
import Navbar from '@/components/Navbar';
import FitBot from '@/components/FitBot';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Users, Heart, MessageCircle, Award, TrendingUp, Flag, PlusCircle, Filter } from 'lucide-react';

// Sample data for community
const challenges = [
  {
    id: 1,
    title: '30-Day Push-Up Challenge',
    description: 'Increase your push-up count by completing daily push-ups for 30 days.',
    participants: 748,
    image: 'https://images.unsplash.com/photo-1598971639058-aee79e11be1a?q=80&w=2376&auto=format&fit=crop',
    daysLeft: 12,
    level: 'Beginner'
  },
  {
    id: 2,
    title: 'Summer Shred Challenge',
    description: 'Get beach-ready with this 6-week fat-burning and muscle-toning challenge.',
    participants: 1254,
    image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=2070&auto=format&fit=crop',
    daysLeft: 20,
    level: 'Intermediate'
  },
  {
    id: 3,
    title: 'Hydration Challenge',
    description: 'Drink at least 2.5 liters of water every day for 14 days.',
    participants: 952,
    image: 'https://images.unsplash.com/photo-1548161126-7fd21a019c96?q=80&w=2487&auto=format&fit=crop',
    daysLeft: 5,
    level: 'Beginner'
  },
  {
    id: 4,
    title: 'Yoga Every Day',
    description: 'Complete at least 15 minutes of yoga daily for 21 days.',
    participants: 632,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2520&auto=format&fit=crop',
    daysLeft: 15,
    level: 'All Levels'
  }
];

const posts = [
  {
    id: 1,
    user: {
      name: 'Emma Thompson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      level: 'Gold Member'
    },
    content: 'Just completed my first 10K run! Feeling amazing and grateful for all the support from this community. The training plan from FitGenius really helped me prepare!',
    time: '2 hours ago',
    likes: 42,
    comments: 12,
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 2,
    user: {
      name: 'James Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      level: 'Silver Member'
    },
    content: 'Day 15 of the 30-day push-up challenge! Started at 10 push-ups and now I can do 25 in one go. Progress feels great!',
    time: '5 hours ago',
    likes: 28,
    comments: 8,
    image: null
  },
  {
    id: 3,
    user: {
      name: 'Sophia Chen',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      level: 'Platinum Member'
    },
    content: 'Meal prepping for the week! Here\'s my high-protein lunch boxes: grilled chicken, quinoa, roasted vegetables, and a tahini dressing. Simple but delicious and keeps me energized for afternoon workouts.',
    time: '1 day ago',
    likes: 56,
    comments: 15,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop'
  }
];

const leaderboardUsers = [
  { id: 1, name: 'Sarah Johnson', points: 2540, avatar: 'https://randomuser.me/api/portraits/women/21.jpg', rank: 1 },
  { id: 2, name: 'Michael Chen', points: 2320, avatar: 'https://randomuser.me/api/portraits/men/67.jpg', rank: 2 },
  { id: 3, name: 'Emma Wilson', points: 2180, avatar: 'https://randomuser.me/api/portraits/women/63.jpg', rank: 3 },
  { id: 4, name: 'David Garcia', points: 1970, avatar: 'https://randomuser.me/api/portraits/men/43.jpg', rank: 4 },
  { id: 5, name: 'You', points: 1850, avatar: '', rank: 5, isCurrentUser: true },
  { id: 6, name: 'Alex Thompson', points: 1720, avatar: 'https://randomuser.me/api/portraits/men/72.jpg', rank: 6 },
  { id: 7, name: 'Olivia Martinez', points: 1690, avatar: 'https://randomuser.me/api/portraits/women/25.jpg', rank: 7 },
];

const Community = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Community</h1>
            <p className="text-gray-600">Connect with fitness enthusiasts, join challenges, and share your journey</p>
          </div>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="feed" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="feed">
              <MessageCircle className="h-4 w-4 mr-2" />
              Feed
            </TabsTrigger>
            <TabsTrigger value="challenges">
              <Flag className="h-4 w-4 mr-2" />
              Challenges
            </TabsTrigger>
            <TabsTrigger value="leaderboard">
              <TrendingUp className="h-4 w-4 mr-2" />
              Leaderboard
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="feed" className="mt-6 space-y-6">
            {/* Create Post */}
            <Card className="fitness-card">
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <Input placeholder="Share your fitness journey..." className="fitness-input" />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button className="fitness-button">
                    Post Update
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Feed Posts */}
            {posts.map((post) => (
              <Card key={post.id} className="fitness-card overflow-hidden">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3 mb-4">
                    <Avatar>
                      <AvatarImage src={post.user.avatar} />
                      <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{post.user.name}</h3>
                        <Badge variant="outline" className="text-xs py-0">
                          {post.user.level}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">{post.time}</p>
                    </div>
                  </div>
                  
                  <p className="mb-4">{post.content}</p>
                  
                  {post.image && (
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <img 
                        src={post.image} 
                        alt="Post" 
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex justify-between mt-2 pt-3 border-t">
                    <Button variant="ghost" size="sm" className="text-gray-600">
                      <Heart className="h-4 w-4 mr-2" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {post.comments}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="challenges" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Active Challenges</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button className="fitness-button" size="sm">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Challenge
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.map((challenge) => (
                <Card key={challenge.id} className="fitness-card overflow-hidden flex flex-col h-full">
                  <div className="relative">
                    <img 
                      src={challenge.image} 
                      alt={challenge.title} 
                      className="w-full h-40 object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-gold">
                      {challenge.level}
                    </Badge>
                  </div>
                  
                  <CardHeader>
                    <CardTitle>{challenge.title}</CardTitle>
                    <CardDescription>{challenge.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-grow">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-gold" />
                      <span>{challenge.participants} participants</span>
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="font-medium">{challenge.daysLeft} days</span> left to join
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button className="w-full fitness-button">
                      Join Challenge
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="leaderboard" className="mt-6">
            <Card className="fitness-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-6 w-6 text-gold" />
                  Weekly FitCoin Leaderboard
                </CardTitle>
                <CardDescription>
                  Top performers based on FitCoins earned from workouts, challenges, and consistency
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-1">
                  {leaderboardUsers.map((user) => (
                    <div 
                      key={user.id} 
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        user.isCurrentUser ? 'bg-gold/10 border border-gold/20' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full ${
                          user.rank <= 3 ? 'bg-gold text-white' : 'bg-gray-100'
                        }`}>
                          {user.rank}
                        </div>
                        <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                          {user.avatar ? (
                            <AvatarImage src={user.avatar} />
                          ) : (
                            <AvatarFallback className="bg-gold/20 text-gold">
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          {user.isCurrentUser && (
                            <span className="text-xs text-gold">That's you!</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="font-bold">{user.points}</span>
                        <Award className="h-4 w-4 text-gold ml-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* FitBot */}
      <FitBot />
    </div>
  );
};

export default Community;
