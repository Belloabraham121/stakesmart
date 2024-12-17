import type { Metadata } from "next";

const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : `http://localhost:${process.env.PORT || 3000}`;
const titleTemplate = "%s | Scaffold-ETH 2";

export const getMetadata = ({
  title = "StakeSmart",
  description = "StakeSmart is an all-in-one platform that aggregates popular staking protocols like Aave, Lido, and EtherFi, enabling users to compare real-time ROI, fees, and staking terms. Through a clear and intuitive interface, StakeSmart empowers users to explore staking opportunities across multiple protocols, select the best options for their goals, and maximize returns. The platform demystifies staking for all experience levels, offering transparency, ease of access, and informed decision-making for DeFi investors",
  imageRelativePath = "/thumbnail.jpg",
}: {
  title: string;
  description: string;
  imageRelativePath?: string;
}): Metadata => {
  const imageUrl = `${baseUrl}${imageRelativePath}`;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: titleTemplate,
    },
    description: description,
    openGraph: {
      title: {
        default: title,
        template: titleTemplate,
      },
      description: description,
      images: [
        {
          url: imageUrl,
        },
      ],
    },
    twitter: {
      title: {
        default: title,
        template: titleTemplate,
      },
      description: description,
      images: [imageUrl],
    },
    icons: {
      icon: [{ url: "/logo (3).svg", sizes: "32x32", type: "image/svg" }],
    },
  };
};
