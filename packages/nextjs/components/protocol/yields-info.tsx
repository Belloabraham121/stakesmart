import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { YieldsPoolData } from "@/types/yields-api";

interface YieldsInfoProps {
  poolData: YieldsPoolData | null;
}

export function YieldsInfo({ poolData }: YieldsInfoProps) {
  if (!poolData) {
    return (
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>Yield Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No yield data available for this protocol.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Yield Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-gray-400">Base APY</p>
              <p className="text-2xl font-bold text-gray-400">{poolData.apyBase.toFixed(2)}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Reward APY</p>
              <p className="text-2xl font-bold text-gray-400">{poolData.apyReward?.toFixed(2) || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Total APY</p>
              <p className="text-2xl font-bold text-gray-400">{poolData.apy.toFixed(2)}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Pool Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-sm text-gray-400">Chain</p>
              <p className="font-medium text-gray-400">{poolData.chain}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Symbol</p>
              <p className="font-medium text-gray-400">{poolData.symbol}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">TVL (USD)</p>
              <p className="font-medium text-gray-400">${poolData.tvlUsd.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">IL Risk</p>
              <p className="font-medium text-gray-400">{poolData.ilRisk}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Exposure</p>
              <p className="font-medium text-gray-400">{poolData.exposure}</p>
            </div>
            {poolData.poolMeta && (
              <div>
                <p className="text-sm text-gray-400">Pool Meta</p>
                <p className="font-medium text-gray-400">{poolData.poolMeta}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">APY Changes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-gray-400">1 Day Change</p>
              <p className={`font-medium ${poolData.apyPct1D >= 0 ? "text-green-500" : "text-red-500"}`}>
                {poolData.apyPct1D.toFixed(2)}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">7 Day Change</p>
              <p className={`font-medium ${poolData.apyPct7D >= 0 ? "text-green-500" : "text-red-500"}`}>
                {poolData.apyPct7D.toFixed(2)}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">30 Day Change</p>
              <p className={`font-medium ${poolData.apyPct30D >= 0 ? "text-green-500" : "text-red-500"}`}>
                {poolData.apyPct30D.toFixed(2)}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {poolData.predictions && (
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Predictions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm text-gray-400">Predicted Class</p>
                <p className="font-medium text-gray-400">{poolData.predictions.predictedClass}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Predicted Probability</p>
                <p className="font-medium text-gray-400">{poolData.predictions.predictedProbability}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Binned Confidence</p>
                <p className="font-medium text-gray-400">{poolData.predictions.binnedConfidence}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
