import { DEMO_MODE } from '../../api/apiClient';

export default function DemoBanner() {
  if (!DEMO_MODE) return null;
  return (
    <div className="demo-banner">
      ⚡ DEMO MODE — Sample data is displayed. Connect the backend to use real data.
    </div>
  );
}
