import AnalyticsDashboard from '@/components/Analytics';

const RedirectAnalytics = async ({ params }: { params: { id: string } }) => {
  const searchParams = await params;
  const id = searchParams?.id;

  return (
    <div className="h-main mt-nav overflow-y-auto p-4 md:p-8">
      <AnalyticsDashboard redirectId={id} />
    </div>
  );
};

export default RedirectAnalytics;
