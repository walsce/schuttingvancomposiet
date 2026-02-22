
-- Allow anyone to insert into crm_contacts (for contact form, public submissions)
CREATE POLICY "Anyone can insert contacts"
ON public.crm_contacts FOR INSERT
WITH CHECK (true);

-- Allow anyone to insert activities (for contact form activity logging)
CREATE POLICY "Anyone can insert activities"
ON public.crm_activities FOR INSERT
WITH CHECK (true);
