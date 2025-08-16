import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Award, ChevronDown, ChevronUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { formatDistance } from "date-fns";

interface NewsItem {
  id: string;
  title: string;
  short_desc: string | null;
  content: string | null;
  image_url: string | null;
  published_at: string | null;
  created_at: string;
}

interface Achievement {
  id: string;
  title: string;
  short_desc: string | null;
  image_url: string | null;
  occurred_at: string | null;
  created_at: string;
  content?: string | null;
}

const NewsAchievementsSection = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchNewsAndAchievements();
  }, []);

  const fetchNewsAndAchievements = async () => {
    try {
      const [newsResponse, achievementsResponse] = await Promise.all([
        supabase
          .from('news')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3),
        supabase
          .from('achievements')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(2)
      ]);

      if (newsResponse.error) throw newsResponse.error;
      if (achievementsResponse.error) throw achievementsResponse.error;

      setNews(newsResponse.data || []);
      setAchievements(achievementsResponse.data || []);
    } catch (error) {
      console.error('Error fetching news and achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const formatDate = (dateString: string) => {
    return formatDistance(new Date(dateString), new Date(), { addSuffix: true });
  };

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">News & Achievements</h2>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  type CombinedItem = (NewsItem & { type: 'news' }) | (Achievement & { type: 'achievement' });
  
  const allItems: CombinedItem[] = [
    ...news.map(item => ({ ...item, type: 'news' as const })),
    ...achievements.map(item => ({ ...item, type: 'achievement' as const }))
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 4);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">News & Achievements</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with our latest news, milestones, and achievements
          </p>
        </div>

        {allItems.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {allItems.map((item) => {
              const isExpanded = expandedItems.has(item.id);
              const hasLongContent = item.content && item.content.length > 200;

              return (
                <Card key={item.id} className="group hover:shadow-lg transition-shadow animate-fade-in">
                  {item.image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {item.type === 'news' ? (
                          <Calendar className="h-5 w-5 text-primary" />
                        ) : (
                          <Award className="h-5 w-5 text-yellow-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {item.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.type === 'achievement' && item.occurred_at
                            ? new Date(item.occurred_at).toLocaleDateString()
                            : formatDate(item.created_at)}
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {item.short_desc && (
                      <p className="text-muted-foreground mb-3">{item.short_desc}</p>
                    )}
                    
                    {item.content && (
                      <div className="space-y-3">
                        <div className={`text-sm leading-relaxed ${!isExpanded && hasLongContent ? 'line-clamp-3' : ''}`}>
                          {isExpanded || !hasLongContent 
                            ? item.content 
                            : `${item.content.substring(0, 200)}...`
                          }
                        </div>
                        
                        {hasLongContent && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleExpanded(item.id)}
                            className="text-primary hover:text-primary/80 p-0 h-auto"
                          >
                            {isExpanded ? (
                              <>
                                <ChevronUp className="h-4 w-4 mr-1" />
                                Read Less
                              </>
                            ) : (
                              <>
                                <ChevronDown className="h-4 w-4 mr-1" />
                                Read More
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No news or achievements to display yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsAchievementsSection;