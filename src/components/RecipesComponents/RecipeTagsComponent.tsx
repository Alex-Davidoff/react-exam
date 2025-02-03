import { Link } from "react-router";

interface ITagsProps {
    tags: string[];
}

export const RecipeTagsComponent = ({tags}: ITagsProps) => {
    if (tags) {
    return(
        <ul className="flex gap-4">
            {tags.map((tag, index) => (
                <li key={index} className="underline">
                <Link to={`/auth/recipes?tag=${tag}`}>#{tag}</Link>  
                </li>
            ))}
        </ul>
    )}
}