import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Edit, Trash2, Upload, Calendar, FileText, Award, Image } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { formatDistance } from "date-fns";

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  featured_image_url: string | null;
  published_at: string | null;
  created_at: string;
}

interface News {
  id: string;
  title: string;
  slug: string;
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
}

interface Gallery {
  id: string;
  name: string;
  slug: string;
  event_date: string | null;
  cover_image_url: string | null;
  created_at: string;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'blogs' | 'news' | 'achievements' | 'galleries'>('blogs');
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [blogsData, newsData, achievementsData, galleriesData] = await Promise.all([
        supabase.from('blogs').select('*').order('created_at', { ascending: false }),
        supabase.from('news').select('*').order('created_at', { ascending: false }),
        supabase.from('achievements').select('*').order('created_at', { ascending: false }),
        supabase.from('galleries').select('*').order('created_at', { ascending: false })
      ]);

      if (blogsData.error) throw blogsData.error;
      if (newsData.error) throw newsData.error;
      if (achievementsData.error) throw achievementsData.error;
      if (galleriesData.error) throw galleriesData.error;

      setBlogs(blogsData.data || []);
      setNews(newsData.data || []);
      setAchievements(achievementsData.data || []);
      setGalleries(galleriesData.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return formatDistance(new Date(dateString), new Date(), { addSuffix: true });
  };

  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      );
    }

    switch (activeTab) {
      case 'blogs':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Blogs ({blogs.length})</h2>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                New Blog
              </Button>
            </div>
            
            {blogs.length === 0 ? (
              <div className="text-center py-16">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No blogs yet. Create your first blog post!</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {blogs.map((blog) => (
                  <Card key={blog.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{blog.title}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            Created {formatDate(blog.created_at)}
                            {blog.published_at && ` • Published ${formatDate(blog.published_at)}`}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );

      case 'news':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">News & Updates ({news.length})</h2>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                New Article
              </Button>
            </div>
            
            {news.length === 0 ? (
              <div className="text-center py-16">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No news articles yet.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {news.map((item) => (
                  <Card key={item.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">{item.short_desc}</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Created {formatDate(item.created_at)}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );

      case 'achievements':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Achievements ({achievements.length})</h2>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                New Achievement
              </Button>
            </div>
            
            {achievements.length === 0 ? (
              <div className="text-center py-16">
                <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No achievements yet.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {achievements.map((achievement) => (
                  <Card key={achievement.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{achievement.title}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">{achievement.short_desc}</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {achievement.occurred_at && `Occurred: ${new Date(achievement.occurred_at).toLocaleDateString()}`}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );

      case 'galleries':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Event Galleries ({galleries.length})</h2>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                New Gallery
              </Button>
            </div>
            
            {galleries.length === 0 ? (
              <div className="text-center py-16">
                <Image className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No galleries yet.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {galleries.map((gallery) => (
                  <Card key={gallery.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{gallery.name}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            {gallery.event_date && `Event Date: ${new Date(gallery.event_date).toLocaleDateString()}`}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Created {formatDate(gallery.created_at)}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - EVNTING</title>
        <meta name="description" content="Admin dashboard for managing EVNTING content" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your content and view analytics</p>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-border mb-8">
            <nav className="flex space-x-8">
              {[
                { key: 'blogs', label: 'Blogs', icon: FileText },
                { key: 'news', label: 'News', icon: FileText },
                { key: 'achievements', label: 'Achievements', icon: Award },
                { key: 'galleries', label: 'Galleries', icon: Image }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as any)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === key
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </div>
      </main>
    </>
  );
};

export default AdminDashboard;