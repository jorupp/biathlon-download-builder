import Image from "next/image";
import { Content, Rail, Root, Section } from "./types";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/collapsible";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/card";

export default async function Home() {
  const res = await fetch("https://api.evsports.opentv.com/contentdelivery/v2/templateviews/Videos-IBU", {
    headers: {
      Authorization: `Bearer ${process.env.TOKEN}`,
      "Nagra-Device-Type": "Android,IOS",
      "Nagra-Target": "everything",
      // needed a bit of trial and error to figure out that this was needed
      "accept-language": "en_US",
    },
  });
  const data = (await res.json()) as Root;

  // const worldCups = data.rails.filter((i) =>
  //   i.sections.some((s) => s.contents.some((c) => c?.Categories?.some((cc) => cc === "Age:Senior")))
  // );
  return <RenderRoot root={data} />;
}

const RenderRoot = ({ root }: { root: Root }) => {
  return (
    <div className="flex flex-col gap-2 p-2">
      {root.rails.map((rail, ix) => (
        <RenderRail rail={rail} key={ix} />
      ))}
    </div>
  );
};

const RenderRail = ({ rail }: { rail: Rail }) => {
  const shared = sharedRailCategories(rail);
  // console.log("rail", rail.name);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{rail.name}</CardTitle>
        <CardDescription>
          <RenderCategories categories={shared} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Collapsible>
          <CollapsibleTrigger>Details</CollapsibleTrigger>
          <CollapsibleContent>
            {rail.sections.map((section, ix) => (
              <RenderSection key={ix} section={section} shared={shared} />
            ))}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

const compare = <T extends string | number | Date>(a: T, b: T) => (a < b ? -1 : a > b ? 1 : 0);

const RenderCategories = ({ categories }: { categories: string[] }) =>
  !!categories.length && (
    <ul>
      {categories.sort(compare).map((c, ix) => (
        <li key={ix}>{c}</li>
      ))}
    </ul>
  );

const RenderSection = ({ section, shared: railShared }: { section: Section; shared: string[] }) => {
  const shared = sharedSectionCategories(section);
  const showShared = shared.filter((i) => !railShared.includes(i));

  // console.log("section", { section });
  return (
    <Card>
      <CardHeader>
        <CardTitle>{section.name}</CardTitle>
        <CardDescription>
          <RenderCategories categories={showShared} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Collapsible>
          <CollapsibleTrigger>Details</CollapsibleTrigger>
          <CollapsibleContent>
            {section.contents.map(
              (content, ix) => content && <RenderContent key={ix} content={content} shared={shared} />
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

const RenderContent = ({ content, shared }: { content: Content; shared: string[] }) => {
  // console.log({ content });
  const categories = content.Categories?.filter((i) => !shared.includes(i)) || [];
  return (
    <Card>
      <CardHeader>
        <CardTitle>{content.title || content.Title}</CardTitle>
        <CardDescription>
          <RenderCategories categories={categories} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{content.Synopsis}</p>
        <pre>{JSON.stringify(content, null, 2)}</pre>
      </CardContent>
    </Card>
  );
  // return (
  //   <div>
  //     <h3>{content.title || content.Title}</h3>
  //     <p>{content.Synopsis}</p>
  //     {!!categories.length && (
  //       <ul>
  //         {categories.map((c, ix) => (
  //           <li key={ix}>{c}</li>
  //         ))}
  //       </ul>
  //     )}
  //   </div>
  // );
};

function getShared(data: string[][]) {
  const shared = new Set(data.flat());
  for (const d of data) {
    for (const c of Array.from(shared.values())) {
      if (!d.includes(c)) shared.delete(c);
    }
  }
  return Array.from(shared.values());
}

function sharedRailCategories(rail: Rail) {
  return getShared(rail.sections.map((s) => sharedSectionCategories(s)));
}
function sharedSectionCategories(section: Section) {
  return getShared(section.contents.map((c) => c?.Categories || []).filter((c) => c.length > 0));
}
