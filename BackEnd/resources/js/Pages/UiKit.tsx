import {FC} from "react";

const UiKit = () => {
  return (
    <div className="p-4">
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <p>Paragraph lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <p className="subtitle">Subtitle</p>
      <div>
        <div className="flex gap-2 flex-wrap">
          <p className="text-lg">Backgrounds:</p>
          <div className="p-2 bg-background">bg-background</div>
          <div className="p-2 bg-neutral">bg-neutral</div>
          <div className="p-2 bg-base-100">bg-base-100</div>
          <div className="p-2 bg-base-200">bg-base-200</div>
          <div className="p-2 bg-base-300">bg-base-300</div>
          <div className="p-2 bg-primary">bg-primary</div>
          <div className="p-2 bg-secondary">bg-secondary</div>
          <div className="p-2 bg-accent">bg-accent</div>
          <div className="p-2 bg-info">bg-info</div>
          <div className="p-2 bg-success">bg-success</div>
          <div className="p-2 bg-warning">bg-warning</div>
          <div className="p-2 bg-error">bg-error</div>
          <div className="p-2 bg-ghost">bg-ghost</div>
          <div className="p-2 bg-link">bg-link</div>
          <div className="p-2 bg-destructive">bg-destructive</div>
          <div className="p-2 bg-muted">bg-muted</div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <p className="text-lg">Foregrounds:</p>
          <div className="p-2 bg-foreground">bg-foreground</div>
          <div className="p-2 bg-neutral-f">bg-primary-foreground</div>
          <div className="p-2 bg-primary-foreground">bg-primary-foreground</div>
          <div className="p-2 bg-secondary-foreground">bg-secondary-foreground</div>
          <div className="p-2 bg-accent-foreground">bg-accent-foreground</div>
          <div className="p-2 bg-destructive-foreground">bg-destructive-foreground</div>
          <div className="p-2 bg-muted-foreground">bg-muted-foreground</div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <p className="text-lg">Contents:</p>
          <div className="p-2 bg-neutral-content">bg-neutral-content</div>
          <div className="p-2 bg-base-content">bg-base-content</div>
          <div className="p-2 bg-primary-content">bg-primary-content</div>
          <div className="p-2 bg-secondary-content">bg-secondary-content</div>
          <div className="p-2 bg-accent-content">bg-accent-content</div>
          <div className="p-2 bg-info-content">bg-info-content</div>
          <div className="p-2 bg-success-content">bg-success-content</div>
          <div className="p-2 bg-warning-content">bg-warning-content</div>
          <div className="p-2 bg-error-content">bg-error-content</div>
        </div>
      </div>
      <div className="flex flex-col gap-2 py-2">
        <div className="flex gap-2 flex-wrap">
          <button className="btn">btn</button>
          <button className="btn btn-neutral">btn btn-neutral</button>
          <button className="btn btn-primary">btn btn-primary</button>
          <button className="btn btn-secondary">btn btn-secondary</button>
          <button className="btn btn-accent">btn btn-accent</button>
          <button className="btn btn-info">btn btn-info</button>
          <button className="btn btn-success">btn btn-success</button>
          <button className="btn btn-warning">btn btn-warning</button>
          <button className="btn btn-error">btn btn-error</button>
          <button className="btn btn-ghost">btn btn-ghost</button>
          <button className="btn btn-link">btn btn-link</button>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button className="btn btn-outline">btn</button>
          <button className="btn btn-outline btn-neutral">btn btn-neutral</button>
          <button className="btn btn-outline btn-primary">btn btn-primary</button>
          <button className="btn btn-outline btn-secondary">btn btn-secondary</button>
          <button className="btn btn-outline btn-accent">btn btn-accent</button>
          <button className="btn btn-outline btn-info">btn btn-info</button>
          <button className="btn btn-outline btn-success">btn btn-success</button>
          <button className="btn btn-outline btn-warning">btn btn-warning</button>
          <button className="btn btn-outline btn-error">btn btn-error</button>
          <button className="btn btn-outline btn-ghost">btn btn-ghost</button>
          <button className="btn btn-outline btn-link">btn btn-link</button>
        </div>
        <div tabIndex={0} className="collapse">
          <div className="collapse-title">Collapse</div>
          <div className="collapse-content">
            <p>Content</p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="loading loading-spinner loading-xs"></span>
          <span className="loading loading-spinner loading-sm"></span>
          <span className="loading loading-spinner loading-md"></span>
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    </div>
  );
};

UiKit.layout = (page: JSX.Element) => <>{page}</>;
export default UiKit;
