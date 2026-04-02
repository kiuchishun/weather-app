type Props = {
  loading: boolean;
  errorMsg: string;
};

export default function StatusMessage({ loading, errorMsg }: Props) {
  if (loading) return <p>読み込み中</p>;
  if (errorMsg) return <p>{errorMsg}</p>;
  return null;
}
