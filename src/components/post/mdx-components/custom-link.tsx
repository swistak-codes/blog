import Link from 'next/link';

export default function CustomLink(props: any) {
  const href = props.href;
  const isInternalLink = href && href.startsWith('/');
  const isAnchorLink = href && href.startsWith('#');

  if (isAnchorLink) {
    return <a {...props} />;
  }

  if (isInternalLink) {
    return (
      <Link href={href} target="_blank">
        {props.children}
      </Link>
    );
  }

  return <a target="_blank" rel="noreferrer" {...props} />;
}
