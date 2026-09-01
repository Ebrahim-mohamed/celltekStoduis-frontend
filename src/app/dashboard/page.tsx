"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ContactsTab from "./tabs/contacts";
import NewsTab from "./tabs/news";
import JobsTab from "./tabs/Jobs";
import TestimonialsTab from "./tabs/testimonials";
import ProjectsTab from "./tabs/projects";
import LogosTab from "./tabs/logos";
import ApplicationsTab from "./tabs/applications";
import CompanyProfileTab from "./tabs/companyProfileTab";

export default function DashboardPage() {
  return (
    <Tabs defaultValue="contacts">
      <TabsList className="mb-6">
        <TabsTrigger value="contacts">Contacts</TabsTrigger>
        {/* <TabsTrigger value="news">News</TabsTrigger> */}
        {/* <TabsTrigger value="jobs">Jobs</TabsTrigger> */}
        <TabsTrigger value="projects">Projects</TabsTrigger>
        <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
        <TabsTrigger value="logos">Clients logo</TabsTrigger>
        {/* <TabsTrigger value="application">Applications</TabsTrigger> */}
        {/* <TabsTrigger value="shares">Shares</TabsTrigger> */}
      </TabsList>

      <TabsContent value="contacts">
        <ContactsTab />
      </TabsContent>
      <TabsContent value="news">
        <NewsTab />
      </TabsContent>
      <TabsContent value="jobs">
        <JobsTab />
      </TabsContent>
      <TabsContent value="testimonials">
        <TestimonialsTab />
      </TabsContent>
      <TabsContent value="projects">
        <ProjectsTab />
      </TabsContent>
      <TabsContent value="logos">
        <LogosTab />
      </TabsContent>
      <TabsContent value="application">
        <ApplicationsTab />
      </TabsContent>
      <TabsContent value="shares">
        <CompanyProfileTab />
      </TabsContent>

      {/* We will add the rest next */}
    </Tabs>
  );
}
