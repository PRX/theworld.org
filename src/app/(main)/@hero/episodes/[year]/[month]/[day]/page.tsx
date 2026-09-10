import {
  ExplorerHero,
  ExplorerHeroHeading,
} from "@/app/(main)/_components/Explorer";
import { DateTime } from "@/components/DateTime";
import { BoomBoxIcon } from "lucide-react";

export default async function EpisodesByDateHero({
  params,
}: {
  params: Promise<Record<"year" | "month" | "day", string>>;
}) {
  try {
    const { year: yearParam, month: monthParam, day: dayParam } = await params;
    const year = parseInt(yearParam, 10);
    const month = parseInt(monthParam, 10);
    const day = parseInt(dayParam, 10);
    const date = new Temporal.PlainDate(year, month, day).toString();

    return (
      <ExplorerHero>
        <ExplorerHeroHeading>
          <BoomBoxIcon />
          <span>
            Episodes for{" "}
            <DateTime
              date={date}
              options={{
                year: "numeric",
                month: "long",
                day: "numeric",
              }}
            />
          </span>
        </ExplorerHeroHeading>
      </ExplorerHero>
    );
  } catch (_e) {
    return null;
  }
}
