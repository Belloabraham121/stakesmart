import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Protocol } from "@/types/api";
import { YieldsPoolData } from "@/types/yields-api";
import { ExternalLink, Github, Twitter } from "lucide-react";

interface ProtocolInfoProps {
  protocol: Protocol;
  poolData: YieldsPoolData | null;
}

export function ProtocolInfo({ protocol }: ProtocolInfoProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="font-bold text-white">Protocol Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-white">Description</p>
            <p className="font-medium text-gray-400 ">{protocol.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-white">Category</p>
              <p className="font-medium text-gray-400">{protocol.category}</p>
            </div>
            <div>
              <p className="text-sm text-white">Symbol</p>
              <p className="font-medium text-gray-400">{protocol.symbol}</p>
            </div>
            <div>
              <p className="text-sm text-white">Chain</p>
              <p className="font-medium text-gray-400">{protocol.chain}</p>
            </div>
            <div>
              <p className="text-sm text-white">Module</p>
              <p className="font-medium text-gray-400">{protocol.module}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-white">Supported Chains</p>
            <div className="flex flex-wrap gap-2">
              {protocol.chains.map(chain => (
                <span key={chain} className="bg-gray-800 px-2 py-1 rounded-full text-xs font-medium text-gray-400">
                  {chain}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-white">Links</p>
            <div className="flex flex-wrap gap-4">
              <a
                href={protocol.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-500 hover:underline"
              >
                Website <ExternalLink className="ml-1 h-4 w-4" />
              </a>
              {protocol.twitter && (
                <a
                  href={`https://twitter.com/${protocol.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-500 hover:underline"
                >
                  <Twitter className="mr-1 h-4 w-4" /> Twitter
                </a>
              )}
              {protocol.github && protocol.github.length > 0 && (
                <a
                  href={`https://github.com/${protocol.github[0]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-500 hover:underline"
                >
                  <Github className="mr-1 h-4 w-4" /> GitHub
                </a>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="font-bold text-white">Additional Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-white">Audit Status</p>
              <p className="font-medium text-gray-400">{protocol.audits === "1" ? "Audited" : "Not Audited"}</p>
            </div>
            <div>
              <p className="text-sm text-white">Open Source</p>
              <p className="font-medium text-gray-400">{protocol.openSource ? "Yes" : "No"}</p>
            </div>
          </div>

          {protocol.audit_note && (
            <div className="space-y-2">
              <p className="text-sm text-white">Audit Note</p>
              <p>{protocol.audit_note}</p>
            </div>
          )}

          {protocol.audit_links && protocol.audit_links.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-white">Audit Links</p>
              <ul>
                {protocol.audit_links.map((link, index) => (
                  <li key={index}>
                    <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                      Audit Report {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {protocol.treasury && (
            <div className="space-y-2">
              <p className="text-sm text-white">Treasury</p>
              <p className="font-medium text-gray-400">{protocol.treasury}</p>
            </div>
          )}

          {(protocol.gecko_id || protocol.cmcId) && (
            <div className="space-y-2">
              <p className="text-sm text-white">Market Data</p>
              <div className="flex flex-wrap gap-4">
                {protocol.gecko_id && (
                  <a
                    href={`https://www.coingecko.com/en/coins/${protocol.gecko_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    CoinGecko
                  </a>
                )}
                {protocol.cmcId && (
                  <a
                    href={`https://coinmarketcap.com/currencies/${protocol.cmcId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    CoinMarketCap
                  </a>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
