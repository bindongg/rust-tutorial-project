initSidebarItems({"enum":[["VarError","The error type for operations interacting with environment variables. Possibly returned from `env::var()`."]],"fn":[["args","Returns the arguments that this program was started with (normally passed via the command line)."],["args_os","Returns the arguments that this program was started with (normally passed via the command line)."],["current_dir","Returns the current working directory as a [`PathBuf`]."],["current_exe","Returns the full filesystem path of the current running executable."],["home_dir","Returns the path of the current user’s home directory if known."],["join_paths","Joins a collection of [`Path`]s appropriately for the `PATH` environment variable."],["remove_var","Removes an environment variable from the environment of the currently running process."],["set_current_dir","Changes the current working directory to the specified path."],["set_var","Sets the environment variable `key` to the value `value` for the currently running process."],["split_paths","Parses input according to platform conventions for the `PATH` environment variable."],["temp_dir","Returns the path of a temporary directory."],["var","Fetches the environment variable `key` from the current process."],["var_os","Fetches the environment variable `key` from the current process, returning [`None`] if the variable isn’t set or there’s another error."],["vars","Returns an iterator of (variable, value) pairs of strings, for all the environment variables of the current process."],["vars_os","Returns an iterator of (variable, value) pairs of OS strings, for all the environment variables of the current process."]],"mod":[["consts","Constants associated with the current target"]],"struct":[["Args","An iterator over the arguments of a process, yielding a [`String`] value for each argument."],["ArgsOs","An iterator over the arguments of a process, yielding an [`OsString`] value for each argument."],["JoinPathsError","The error type for operations on the `PATH` variable. Possibly returned from `env::join_paths()`."],["SplitPaths","An iterator that splits an environment variable into paths according to platform-specific conventions."],["Vars","An iterator over a snapshot of the environment variables of this process."],["VarsOs","An iterator over a snapshot of the environment variables of this process."]]});