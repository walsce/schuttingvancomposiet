import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminSettingsPage = () => {
  return (
    <AdminLayout>
      <h1 className="font-serif text-2xl font-bold mb-6">Instellingen</h1>
      <Card>
        <CardHeader><CardTitle>Algemeen</CardTitle></CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Meer instellingen worden later toegevoegd, waaronder Mollie betalingen,
            e-mail notificaties en theme opties.
          </p>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminSettingsPage;
