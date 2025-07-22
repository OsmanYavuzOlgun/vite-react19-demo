import React, { useState } from "react";
import UseOptimisticExample from "./features/UseOptimisticExample";
import UseTransitionExample from "./features/UseTransitionExample";
import ReactCompilerExample from "./features/ReactCompilerExample";
import UseFormStateExample from "./features/UseFormStateExample";
import UseActionStateExample from "./features/UseActionStateExample";
import ServerActionExample from "./features/ServerActionExample";
import UseExample from "./features/UseExample";
import DeferExample from "./features/DeferExample";
import PPRExample from "./features/PPRExample";
import RefExample from "./features/refExample";
import MigrationGuide from "./features/MigrationGuide";

import "./index.scss";

type Page =
  | "optimistic"
  | "transition"
  | "compiler"
  | "useFormState"
  | "useActionState"
  | "serverAction"
  | "jsxUse"
  | "defer"
  | "ppr"
  | "ref"
  | "mg";

function App() {
  const [page, setPage] = useState<Page>("optimistic");

  const renderPage = () => {
    switch (page) {
      case "optimistic":
        return <UseOptimisticExample />;
      case "transition":
        return <UseTransitionExample />;
      case "compiler":
        return <ReactCompilerExample />;
      case "useFormState":
        return <UseFormStateExample />;
      case "useActionState":
        return <UseActionStateExample />;
      case "serverAction":
        return <ServerActionExample />;
      case "jsxUse":
        return <UseExample />;
      case "defer":
        return <DeferExample />;
      case "ppr":
        return <PPRExample />;
      case "ref":
        return <RefExample />;
      case "mg":
        return <MigrationGuide />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="all-container">
      <h1>React 19</h1>
      <div className="navigation-part">
        <nav>
          <button
            className={page === "optimistic" ? "active" : ""}
            onClick={() => setPage("optimistic")}
          >
            ✅ useOptimistic
          </button>
          <button
            className={page === "transition" ? "active" : ""}
            onClick={() => setPage("transition")}
          >
            ✅ useTransition
          </button>
          <button
            className={page === "compiler" ? "active" : ""}
            onClick={() => setPage("compiler")}
          >
            ✅ React Compiler
          </button>
          <button
            className={page === "ref" ? "active" : ""}
            onClick={() => setPage("ref")}
          >
            ✅ Ref
          </button>
          <button
            className={page === "useFormState" ? "active" : ""}
            onClick={() => setPage("useFormState")}
          >
            🧪 useFormState
          </button>
          <button
            className={page === "useActionState" ? "active" : ""}
            onClick={() => setPage("useActionState")}
          >
            🧪 useActionState
          </button>
          <button
            className={page === "serverAction" ? "active" : ""}
            onClick={() => setPage("serverAction")}
          >
            ❌ Server Action
          </button>
          <button
            className={page === "jsxUse" ? "active" : ""}
            onClick={() => setPage("jsxUse")}
          >
            ❌ JSX &lt;use&gt;
          </button>
          <button
            className={page === "defer" ? "active" : ""}
            onClick={() => setPage("defer")}
          >
            ❌ defer()
          </button>
          <button
            className={page === "ppr" ? "active" : ""}
            onClick={() => setPage("ppr")}
          >
            ❌ Partial Pre-rendering
          </button>
          <button
            className={page === "mg" ? "active" : ""}
            onClick={() => setPage("mg")}
          >
            📙 Migration Guide
          </button>
        </nav>
        <div className="rendered-page">{renderPage()}</div>
      </div>
    </div>
  );
}

export default App;
