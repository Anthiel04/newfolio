import Link from "next/link";

export default function page({ params }: { params: string }) {
  return (
    <div className="min-h-screen">
      <div>
        <h1>Project name</h1>
        <p>description</p>
        <Link href="">git</Link>
        <Link href="">preview</Link>
      </div>
      <div className="rounded-3xl hover:rounded-full transition-all">image</div>
    </div>
  );
}
