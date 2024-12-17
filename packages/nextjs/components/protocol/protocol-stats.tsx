import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Protocol } from "@/types/api";
import { YieldsPoolData } from "@/types/yields-api";

interface ProtocolStatsProps {
  protocol: Protocol;
  poolData: YieldsPoolData | null;
}

export function ProtocolStats({ protocol, poolData }: ProtocolStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">Total Value Locked</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-400">${(protocol.tvl / 1e9).toFixed(2)}B</div>
          <p className="text-xs text-muted-foreground text-gray-400">
            {protocol.change_1d >= 0 ? "+" : ""}
            {protocol.change_1d.toFixed(2)}% from yesterday
          </p>
        </CardContent>
      </Card>
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">7d Change</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-400 ">{protocol.change_7d.toFixed(2)}%</div>
          <p className="text-xs text-muted-foreground text-gray-400 ">7-day price change</p>
        </CardContent>
      </Card>
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">Base APY</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-400">{poolData ? poolData.apyBase.toFixed(2) : "N/A"}%</div>
          <p className="text-xs text-muted-foreground text-gray-400">Base Annual Percentage Yield</p>
        </CardContent>
      </Card>
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">Total APY</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-400">{poolData ? poolData.apy.toFixed(2) : "N/A"}%</div>
          <p className="text-xs text-muted-foreground text-gray-400">Total Annual Percentage Yield</p>
        </CardContent>
      </Card>
    </div>
  );
}
