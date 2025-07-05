import Link from 'next/link';

export default function CustomLink(props: any) {
  const href = props.href;
  const isInternalLink = href && href.startsWith('/');

  if (isInternalLink) {
    return (
      <Link href={href} target="_blank">
        {props.children}
      </Link>
    );
  }

  return <a target="_blank" rel="noreferrer" {...props} />;
}
