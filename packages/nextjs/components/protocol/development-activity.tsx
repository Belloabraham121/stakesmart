import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Protocol } from "@/types/api";

interface DevelopmentActivityProps {
  protocol: Protocol;
}

export function DevelopmentActivity({}: DevelopmentActivityProps) {
  // Mock data
  const devActivity = {
    weeklyCommits: 2,
    monthlyCommits: 462,
    weeklyDevelopers: 2,
    monthlyDevelopers: 50,
    lastCommit: "2 hours ago",
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Development Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400">Weekly Statistics</p>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold text-gray-400">{devActivity.weeklyCommits}</p>
                  <p className="text-sm text-gray-400">Commits</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-400">{devActivity.weeklyDevelopers}</p>
                  <p className="text-sm text-gray-400">Developers</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-400">Monthly Statistics</p>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold text-gray-400">{devActivity.monthlyCommits}</p>
                  <p className="text-sm text-gray-400">Commits</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-400">{devActivity.monthlyDevelopers}</p>
                  <p className="text-sm text-gray-400">Developers</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-400">Recent Activity</p>
            <p className="mt-2 text-gray-400">Last commit: {devActivity.lastCommit}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
