import TreeItem from "./TreeItem";

const KeyValueDisplay = ({ data }: { data: Record<string, any> }) => {
  return (
    <table className="w-full border border-solid border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
        {Object.entries(data).map(([key, value], index) => (
          <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
            <td className="w-[300px] px-4 py-2 bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400">
              {key}
            </td>
            <td className="px-4 py-2">
              <div className="font-mono text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-all">
                <TreeItem value={value}/>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default KeyValueDisplay;