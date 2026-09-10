import { redirect, RedirectType } from "next/navigation";

export function redirectToValidDatedRoute(
  pathPrefix: string,
  params: Partial<Record<"year" | "month" | "day", string>>,
  searchParams?: Record<string, string | string[]>,
) {
  const { year, month, day } = params;

  // Bail if year was not provided.
  if (!year) return;

  const now = Temporal.Now.plainDateISO();
  const valid: typeof params = ((y, m, d) => {
    let date: Temporal.PlainDate;
    const yn = Math.min(parseInt(y, 10), now.year);
    const mn = parseInt(m || "1", 10);
    const dn = parseInt(d || "1", 10);

    try {
      date = new Temporal.PlainDate(yn, mn, dn);
    } catch {
      date = now;
    }

    return {
      year: date.year.toString(),
      month: m && date.month.toString().padStart(2, "0"),
      day: d && date.day.toString().padStart(2, "0"),
    };
  })(year, month, day);

  // Bail if year was not provided.
  if (!valid.year) return;

  // Redirect when any of the valid values do not match the original values.
  if (valid.year !== year || valid.month !== month || valid.day !== day) {
    const segments = [valid.year, valid.month, valid.day].filter((v) => !!v);
    const redirectPath = `${pathPrefix.trim() || "/"}/${segments.join("/")}`;
    const url = new URL(redirectPath, "https://theworld.org");

    if (searchParams) {
      Object.entries(searchParams).forEach(([k, v]) => {
        if (Array.isArray(v)) {
          v.forEach((vv) => {
            url.searchParams.append(k, vv);
          });
        } else {
          url.searchParams.append(k, v);
        }
      });
    }

    redirect([url.pathname, url.search].join(""), RedirectType.replace);
  }
}
