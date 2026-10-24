"use client";
import {useEffect, useSyncExternalStore } from "react";
import {RecentEntry, recentServerSnapshot, recentSnapshot, subscribeRecent} from "@/lib/recent/recent";
import { utilitiesByGroup, utilityById } from "@/lib/utility";
import { onPageClick } from "@/lib/helper-functions/on-page-click";
import { C_UtilityCard } from "@/lib/components/utility-card/UtilityCard";
import { C_UtilityGroup } from "@/lib/components/utility-group/UtilityGroup";

export default function Home() {
  const recentRaw = useSyncExternalStore(
      subscribeRecent,
      recentSnapshot,
      recentServerSnapshot,
  );
  const recent = JSON.parse(recentRaw) as RecentEntry[];
  const groups = utilitiesByGroup();

  useEffect(() => {
    window.addEventListener("click", onPageClick, true);
    return () => window.removeEventListener("click", onPageClick, true);
  }, []);

  return (
      <main className="page">
          <section className="utility-group" aria-labelledby="recent-heading">
          <h2 id="recent-heading">Recently used</h2>
          {recent.length === 0 ? (
              <p className="empty">Nothing opened in this browser yet.</p>
          ) : (
              <ul>
                {recent.map((entry) => {
                  const utility = utilityById(entry.id);
                  if (!utility) {
                    return null;
                  }
                  return (
                      <C_UtilityCard
                          key={entry.id}
                          utility={utility}
                          openedAt={entry.openedAt}
                      />
                  );
                })}
              </ul>
          )}
        </section>
        {groups.map(group => <C_UtilityGroup key={group.key} utilityGroup={group}/>)}
      </main>
  );
}
