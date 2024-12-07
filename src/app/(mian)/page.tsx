import DataTable from "./_components/data-table";
import pkg from "../../../package.json";
const cleanVersion = (version: string) => version.replace(/[\^~]/g, "");
async function fetchLatestVersions(dependencies: { [key: string]: string }) {
  const dependencyData = await Promise.all(
    Object.entries(dependencies).map(async ([name, currentVersion]) => {
      try {
        const response = await fetch(
          `https://registry.npmjs.org/${name}/latest`,
          {
            cache: "force-cache",
            next: { revalidate: 3600 }, // Revalidate every hour
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch latest version for ${name}`);
        }

        const data = await response.json();
        const lastVersion = data.version || "N/A";

        const isNeedUpdate = cleanVersion(currentVersion) !== lastVersion;
        return {
          name,
          version: currentVersion,
          lastVersion,
          isNeedUpdate,
        };
      } catch (error) {
        console.error(`Error fetching version for ${name}:`, error);
        return {
          name,
          version: currentVersion,
          lastVersion: "Error",
          isNeedUpdate: false,
        };
      }
    })
  );

  return dependencyData;
}
export default async function Home() {
  const dependencies = await fetchLatestVersions(pkg.dependencies);
  const devDependencies = await fetchLatestVersions(pkg.devDependencies);
  return (
    <div className="container p-4 mx-auto ">
      <h1 className="font-bold text-4xl underline">You did it!</h1>
      <div>React NextJS is here. we use shadcn ui</div>
      <br />
      <h2 className="font-bold text-2xl my-2">dependencies</h2>
      <DataTable data={dependencies} />
      <h2 className="font-bold text-2xl my-2">devDependencies</h2>
      <DataTable data={devDependencies} />
    </div>
  );
}
