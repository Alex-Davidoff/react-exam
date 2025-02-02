interface ITagsProps {
    tags: string[];
}

export const RecipeTagsComponent = ({tags}: ITagsProps) => {
    if (tags) {
    return(
        <ul className="flex gap-4">
            {tags.map((tag, index) => (
                <li key={index}>#{tag}</li>
            ))}
        </ul>
    )}
}