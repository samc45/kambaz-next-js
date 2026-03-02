

export default function ManageFoldersTab() {



  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Configure Class Folders</h2>
      <p>Folders allow you to keep class content organized. When students and instructors add a new post,<br />they will be required to specify at least one folder for their post.</p>

      <div className="mt-6">
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter folder name"
            className="flex-1 px-3 py-2 border border-gray-300 rounded"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Add Folder
          </button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Manage Folders</h3>
          {/* Add folder list content here */}
        </div>
      </div>

    </div>
  );
}