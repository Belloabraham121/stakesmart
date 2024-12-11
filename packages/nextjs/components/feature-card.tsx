import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FeatureCards() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3 w-[407] h-[4000]">
          <Card className="w-[407px] h-[450px] border-zinc-800 bg-zinc-900">
            <CardHeader>
              <CardTitle className="text-xl">Get staking assets</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Buy assets or fund your account with one of the assets that are eligible for staking below
              </p>
              <Image
                src="/security-padlock.png"
                alt="Get staking assets"
                width={533}
                height={533}
                className="mx-auto mb-4"
              />
            </CardContent>
          </Card>
          <Card className="w-[407px] h-[450px] border-zinc-800 bg-zinc-900">
            <CardHeader>
              <CardTitle className="text-xl">Select an asset to stake</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Choose from the available assets in your spot wallet</p>

              <Image
                src="/vault.png"
                alt="Select an asset to stake"
                width={221}
                height={210.84}
                className="mx-auto mb-4"
              />
            </CardContent>
          </Card>
          <Card className="w-[407px] h-[450px] border-zinc-800 bg-zinc-900">
            <CardHeader>
              <CardTitle className="text-xl">Earn Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                You will receive rewards twice a week from your staked assets
              </p>
              <Image src="/Circles.png" alt="Earn Rewards" width={350} height={350} className="mt-9 mx-auto mb-4" />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
