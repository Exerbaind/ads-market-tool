import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-semibold">Страница не найдена</h2>
      <p className="text-slate-600">Проверьте URL или вернитесь на главную.</p>
      <Link className="font-semibold text-slate-900 underline" to="/">
        На главную
      </Link>
    </section>
  );
};
