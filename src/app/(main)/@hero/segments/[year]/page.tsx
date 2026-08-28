import {
  ExplorerHero,
  ExplorerHeroHeading,
} from "@/app/(main)/_components/Explorer";
import { DateTime } from "@/components/DateTime";
import { CassetteTapeIcon } from "lucide-react";

export default async function SegmentsByYearHero({
  params,
}: {
  params: Promise<Record<"year", string>>;
}) {
  try {
    const { year: yearParam } = await params;
    const year = parseInt(yearParam, 10);
    const date = new Temporal.PlainDate(year, 1, 1).toString();

    return (
      <ExplorerHero>
        <ExplorerHeroHeading>
          <CassetteTapeIcon />
          <span>
            Segments for{" "}
            <DateTime
              date={date}
              options={{
                year: "numeric",
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
