import { Elysia } from 'elysia';
import { DemoService } from '@/service/experiment/Demo.service';
import { ExperimentService } from '@/service/experiment/Experiment.service';
import { Id } from '@/lib/id';

export const demoRoutes = new Elysia({ prefix: '/demo' })
  .post('/experiment/:id/fast-complete', async ({ params }) => {
    try {
      const experimentId = params.id as Id<'experiment'>;
      
      // Fast-track the experiment with pre-configured demo data
      const result = await DemoService.fastTrackExperiment(experimentId);
      
      return {
        success: true,
        message: 'Demo experiment completed instantly!',
        data: result
      };
    } catch (error) {
      console.error('Demo experiment error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  })
  
  .get('/experiment/sample-data', async () => {
    return {
      controlVariant: {
        url: 'https://demo-control-ecommerce.vercel.app',
        analysis: {
          success: true,
          summary: 'User browsed products but had navigation difficulties',
          insights: [
            'Users spent significant time scrolling to find categories',
            'Header space underutilized for navigation',
            'Product discovery primarily through scrolling'
          ],
          issues: [
            'No clear product category navigation',
            'Users must scroll through all products',
            'Lack of quick access creates friction'
          ]
        }
      },
      experimentVariant: {
        url: 'https://demo-experiment-ecommerce.vercel.app',
        suggestion: 'Add horizontal navigation bar with 5 product categories',
        analysis: {
          success: true,
          summary: 'Navigation bar reduced product discovery time by 60%',
          insights: [
            'Users immediately noticed new category navigation',
            'Confident navigation behavior observed',
            'Eliminated need for extensive scrolling'
          ],
          issues: [
            'Minor: Some users expected dropdown menus',
            'Sale section occasionally overlooked'
          ]
        },
        implementation: {
          filesModified: ['Header.tsx', 'Navigation.tsx', 'navigation.css'],
          summary: 'Added responsive navigation with 5 categories'
        }
      }
    };
  });