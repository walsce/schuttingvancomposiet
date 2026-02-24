import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { AdminAuthProvider } from "./hooks/useAdminAuth";
import { CartProvider } from "./contexts/CartContext";
import ComingSoonPage from "./pages/ComingSoonPage";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
import AssortimentPage from "./pages/AssortimentPage";
import ContactPage from "./pages/ContactPage";
import ComparePage from "./pages/ComparePage";
import BlogPage from "./pages/BlogPage";
import BlogArticlePage from "./pages/BlogArticlePage";
import ProductPage from "./pages/ProductPage";
import DownloadsPage from "./pages/DownloadsPage";
import DeckPlannerPage from "./pages/DeckPlannerPage";
import FencePlannerPage from "./pages/FencePlannerPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import SEOContentPage from "./pages/SEOContentPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminProductEditPage from "./pages/admin/AdminProductEditPage";
import AdminCategoriesPage from "./pages/admin/AdminCategoriesPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminFeedPage from "./pages/admin/AdminFeedPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";
import AdminCRMPage from "./pages/admin/AdminCRMPage";
import AdminContactDetailPage from "./pages/admin/AdminContactDetailPage";
import AdminAnalyticsPage from "./pages/admin/AdminAnalyticsPage";
import AdminAutomationsPage from "./pages/admin/AdminAutomationsPage";
import NotFound from "./pages/NotFound";
import ChatWidget from "./components/ChatWidget";

const queryClient = new QueryClient();

const ChatWidgetWrapper = () => {
  const location = useLocation();
  const hiddenPaths = ["/schutting-planner", "/vlonder-planner"];
  if (hiddenPaths.includes(location.pathname) || location.pathname.startsWith("/admin")) return null;
  return <ChatWidget />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <CartProvider>
          <AdminAuthProvider>
            <Routes>
              <Route path="/" element={<ComingSoonPage />} />
              <Route path="/assortiment" element={<AssortimentPage />} />
              <Route path="/categorie/:slug" element={<CategoryPage />} />
              <Route path="/product/:slug" element={<ProductPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/vergelijken" element={<ComparePage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogArticlePage />} />
              <Route path="/downloads" element={<DownloadsPage />} />
              <Route path="/vlonder-planner" element={<DeckPlannerPage />} />
              <Route path="/schutting-planner" element={<FencePlannerPage />} />
              <Route path="/winkelwagen" element={<CartPage />} />
              <Route path="/afrekenen" element={<CheckoutPage />} />
              <Route path="/bestelling-bevestigd/:orderId" element={<OrderConfirmationPage />} />
              {/* SEO Content Pages — Pillar, Clusters, Comparisons */}
              <Route path="/schutting-van-composiet" element={<SEOContentPage />} />
              <Route path="/kunststof-schutting" element={<SEOContentPage />} />
              <Route path="/onderhoudsvrije-schutting" element={<SEOContentPage />} />
              <Route path="/composiet-schutting-nadelen" element={<SEOContentPage />} />
              <Route path="/composiet-schutting-prijs-per-meter" element={<SEOContentPage />} />
              <Route path="/composiet-vs-hout-schutting" element={<SEOContentPage />} />
              <Route path="/zwarte-composiet-schutting" element={<SEOContentPage />} />
              <Route path="/antraciet-composiet-schutting" element={<SEOContentPage />} />
              <Route path="/hornbach-composiet-schutting" element={<SEOContentPage />} />
              <Route path="/gamma-composiet-schutting" element={<SEOContentPage />} />
              <Route path="/composiet-schutting-met-beton" element={<SEOContentPage />} />
              <Route path="/elephant-schutting" element={<SEOContentPage />} />
              <Route path="/composiet-schutting-plaatsen" element={<SEOContentPage />} />
              <Route path="/composiet-schutting-zelf-maken" element={<SEOContentPage />} />
              <Route path="/composiet-schutting-levensduur" element={<SEOContentPage />} />
              <Route path="/composiet-schutting-180-hoog" element={<SEOContentPage />} />
              <Route path="/composiet-tuinscherm" element={<SEOContentPage />} />
              <Route path="/praxis-composiet-schutting" element={<SEOContentPage />} />
              <Route path="/karwei-composiet-schutting" element={<SEOContentPage />} />
              {/* Pillar 2: Vlonderplanken */}
              <Route path="/composiet-vlonderplanken" element={<SEOContentPage />} />
              <Route path="/composiet-vlonder-prijs" element={<SEOContentPage />} />
              <Route path="/composiet-terras-aanleggen" element={<SEOContentPage />} />
              <Route path="/composiet-vlonder-onderhoud" element={<SEOContentPage />} />
              <Route path="/composiet-vlonderplanken-nadelen" element={<SEOContentPage />} />
              <Route path="/composiet-vs-hout-vlonder" element={<SEOContentPage />} />
              <Route path="/composiet-vlonder-kleuren" element={<SEOContentPage />} />
              <Route path="/co-extrusie-vlonderplanken" element={<SEOContentPage />} />
              <Route path="/composiet-vlonder-op-beton" element={<SEOContentPage />} />
              <Route path="/composiet-vlonder-zelf-leggen" element={<SEOContentPage />} />
              <Route path="/wpc-terrasplanken" element={<SEOContentPage />} />
              <Route path="/vlonder-onderconstructie" element={<SEOContentPage />} />
              <Route path="/hornbach-composiet-vlonder" element={<SEOContentPage />} />
              <Route path="/gamma-composiet-vlonder" element={<SEOContentPage />} />
              {/* Pillar 3: Gevelbekleding */}
              <Route path="/composiet-gevelbekleding" element={<SEOContentPage />} />
              <Route path="/composiet-gevelbekleding-prijs" element={<SEOContentPage />} />
              <Route path="/gevelbekleding-zonder-onderhoud" element={<SEOContentPage />} />
              <Route path="/rhombus-gevelbekleding-composiet" element={<SEOContentPage />} />
              <Route path="/gevelbekleding-composiet-nadelen" element={<SEOContentPage />} />
              <Route path="/composiet-gevelplanken-monteren" element={<SEOContentPage />} />
              <Route path="/composiet-vs-hout-gevelbekleding" element={<SEOContentPage />} />
              <Route path="/gevelbekleding-kleuren" element={<SEOContentPage />} />
              <Route path="/composiet-gevelbekleding-zwart" element={<SEOContentPage />} />
              {/* Pillar 4: Wat is composiet (Materiaal) */}
              <Route path="/wat-is-composiet" element={<SEOContentPage />} />
              <Route path="/composiet-samenstelling" element={<SEOContentPage />} />
              <Route path="/composiet-duurzaamheid-milieu" element={<SEOContentPage />} />
              <Route path="/composiet-vs-kunststof" element={<SEOContentPage />} />
              <Route path="/composiet-recyclen" element={<SEOContentPage />} />
              <Route path="/composiet-levensduur" element={<SEOContentPage />} />
              <Route path="/composiet-garantie" element={<SEOContentPage />} />
              <Route path="/co-extrusie-vs-composiet" element={<SEOContentPage />} />
              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/crm" element={<AdminCRMPage />} />
              <Route path="/admin/crm/:id" element={<AdminContactDetailPage />} />
              <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
              <Route path="/admin/automations" element={<AdminAutomationsPage />} />
              <Route path="/admin/products" element={<AdminProductsPage />} />
              <Route path="/admin/products/:id" element={<AdminProductEditPage />} />
              <Route path="/admin/categories" element={<AdminCategoriesPage />} />
              <Route path="/admin/orders" element={<AdminOrdersPage />} />
              <Route path="/admin/feed" element={<AdminFeedPage />} />
              <Route path="/admin/settings" element={<AdminSettingsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AdminAuthProvider>
        </CartProvider>
        <ChatWidgetWrapper />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
