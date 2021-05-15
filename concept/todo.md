# IDE
## TODO
### Code editor

- [X] Paper : a basic objet to draw into a canvas
- [X] Easier functions to get text height and width information
- [X] Multi-lines text rendering into a canvas
- [X] Translating position with/without tabs
- [X] Text positioning : relative to its top-left corner
- [X] Clip a text editor into a rectangular part of the canvas
- [X] Store settings into a specialized Settings class
- [X] Pre-calculate and store relatively stable drawing data into a specialized Metrics class
- [X] Blinking cursor
- [X] Cursor moves using arrow keys, begin/end, page-up/down, Ctrl+left/right
- [X] Automatically scroll the editor when the cursor is out of the visible zone
- [X] Editing basics : insert characters, delete, backspace, delete line
- [X] Beware of tabs at line begin : insert tab, delete, backspace
- [X] Map keyboard inputs to actions starting from Code_Editor
- [ ] Walk through tabs : jump
- [ ] Text selection (begin-end)
- [ ] Selection cut/copy/paste
- [ ] Auto-indent : same as previous line

### Line number bar

- [ ] Lines number zone at editor's left (independant but linked canvas zone)

### Toolbar

- [ ] Toolbar canvas zone at bottom
- [ ] line:column display

### Workspaces

- [ ] Workspaces list : local storage (default, choose key, 'ide:workspaces' default)
- [ ] Workspaces list : local indexed DB (choose name, 'ide:workspaces' default)
- [ ] Workspaces list : cloud (need token)
- [ ] Workspace data structure, including files list
- [ ] New / Load / Save workspace
- [ ] List available workspaces
- [ ] Add / remove file storage from workspace
- [ ] Files tree display on canvas : Workspace name, Storages, Files / Directories (recursively)

### Files storage
#### File storage basic features

All must be linked to feature implementation, depending on the file storage type :

- [ ] List files (recursive files list)
- [ ] Get file
- [ ] Put file
- [ ] Create directory
- [ ] New file
- [ ] Delete file or directory (recursively)
- [ ] Move file or directory (recursively)

#### Browser local storage : indexed DB

- [ ] Config : a name. The indexed DB table name will be 'ide:workspace_name:storage_name'
- [ ] Apply all file storage features : one file per record (path + content)

#### Browser local storage : local storage

- [ ] Config : a name. The key will be 'ide:workspace_name:storage_name'
- [ ] Apply all file storage features : one file per key (prefix + path)

#### OS file storage

- [ ] Config : path
- [ ] Linux through Electron API file storage
- [ ] Linux through Tauri API file storage
- [ ] Windows through Electron API file storage
- [ ] Windows through Tauri API file storage

#### Cloud client file storage

- [ ] Config : server address (with default), token and path
- [ ] Apply all file storage features

#### Cloud server :account and file manager

- [ ] Cloud account creation (email => 1st token)
- [ ] Tokens management (each token associated to a description : CRUD)
- [ ] Token authentication
- [ ] Asynchronous authentication (https)
- [ ] Synchronous authentication (https websocket)
- [ ] Put file (file path + content)
- [ ] Get file (file path => content)
- [ ] Get files list (file path => directories and files list)
- [ ] Recursive files list (file path + recursive => directories and files tree)
- [ ] Delete file or directory (recursively)
- [ ] Move file or directory (recursively)
- [ ] List workspaces
- [ ] New workspace (with name)
- [ ] Delete workspace (with name)
- [ ] Get workspace (name => storage list)
- [ ] Put workspace (name + storage list)

### Syntax highlight

- [ ] Study and choose a syntax grammar representation
- [ ] Grammar + text => coloured text
- [ ] Cut display for coloured display

### Syntax check

- [ ] Grammar + text => errors
- [ ] underline errors
- [ ] error information when the text cursor is near / into an error

### Language-associated editing

- [ ] Indent depending on grammar : auto indent / de-indent

## Advanced TODO
### Advanced code editor

- [ ] Multi-text selection
- [ ] Multi-text simultaneous editing
