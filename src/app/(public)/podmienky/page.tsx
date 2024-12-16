// src/app/podmienky/page.tsx

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';

export const metadata = { title: "Podmienky | ZoškaSnap"}


export default function TermsConditions() {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Privacy Policy
        </Typography>

        <Stack spacing={4}>
          <section>
            <Typography variant="h4" gutterBottom>
              Data Controller Information
            </Typography>
            <Typography>
              We act as the data controller for all personal information collected. Our contact details are [INSERT YOUR COMPANY DETAILS AND ADDRESS].
            </Typography>
          </section>

          <section>
            <Typography variant="h4" gutterBottom>
              Data Collection and Processing
            </Typography>
            <Typography variant="h6" gutterBottom>
              Types of Data We Collect
            </Typography>
            <Typography component="ul" sx={{ pl: 2 }}>
              <li>Personal identification information</li>
              <li>Contact information</li>
              <li>Technical data from website usage</li>
              <li>Any other data you voluntarily provide</li>
            </Typography>

            <Typography variant="h6" sx={{ mt: 2 }} gutterBottom>
              Legal Basis for Processing
            </Typography>
            <Typography>
              We process your personal data based on:
            </Typography>
            <Typography component="ul" sx={{ pl: 2 }}>
              <li>Your explicit consent</li>
              <li>Contractual necessity</li>
              <li>Legal obligations</li>
              <li>Legitimate business interests</li>
            </Typography>
          </section>

          <section>
            <Typography variant="h4" gutterBottom>
              Your Rights
            </Typography>
            <Typography component="ul" sx={{ pl: 2 }}>
              <li>Access to your personal data</li>
              <li>Correction of inaccurate data</li>
              <li>Erasure of your data</li>
              <li>Data portability</li>
              <li>Objection to processing</li>
              <li>Right to file a complaint</li>
            </Typography>
          </section>

          <section>
            <Typography variant="h4" gutterBottom>
              Data Sharing and Security
            </Typography>
            <Typography variant="h6" gutterBottom>
              Third-Party Recipients
            </Typography>
            <Typography>
              We may share your data with carefully selected categories of recipients to fulfill our services. All data sharing is conducted with appropriate safeguards in place.
            </Typography>

            <Typography variant="h6" sx={{ mt: 2 }} gutterBottom>
              International Transfers
            </Typography>
            <Typography>
              If we transfer your data outside the EU/EEA, we implement appropriate security measures to protect your information.
            </Typography>
          </section>

          <section>
            <Typography variant="h4" gutterBottom>
              Data Retention
            </Typography>
            <Typography>
              We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected.
            </Typography>
          </section>

          <section>
            <Typography variant="h4" gutterBottom>
              Contact Us
            </Typography>
            <Typography>
              For any privacy-related queries or to exercise your rights, please contact our Data Protection Officer at [INSERT DPO CONTACT DETAILS].
            </Typography>
          </section>

          <section>
            <Typography variant="h4" gutterBottom>
              Updates to This Policy
            </Typography>
            <Typography>
              We may update this privacy policy periodically. The current version is effective as of [INSERT DATE].
            </Typography>
          </section>
        </Stack>
      </Box>
    </Container>
  );
}
