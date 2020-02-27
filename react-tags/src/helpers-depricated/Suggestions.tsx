import * as React from 'react';


function escapeForRegExp(query:any) {
    return query.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
}

function markIt(input:any, query:any) {
    if (query) {
        const regex = RegExp(escapeForRegExp(query), "gi");
        input = input.replace(regex, "<mark>$&</mark>");
    }

    return {
        __html: input
    };
}

function filterSuggestions(query:any, suggestions:any, length:any, suggestionsFilter:any) {
    if (!suggestionsFilter) {
        const regex = new RegExp(`(?:^|\\s)${escapeForRegExp(query)}`, "i");
        suggestionsFilter = (item:any) => regex.test(item.name);
    }

    return suggestions
        .filter((item:any) => suggestionsFilter(item, query))
        .slice(0, length);
}
export interface myProps{
    query:any,
    suggestions:any,
    maxSuggestionsLength:number,
    suggestionsFilter:any,
    expandable:boolean,
    listboxId:any,
    selectedIndex:any,
    addTag:any,
    classNames:any,

}

export default class Suggestions extends React.Component <myProps, any> {
    constructor(props:any) {
        super(props);

        this.state = {
            options: filterSuggestions(
                this.props.query,
                this.props.suggestions,
                this.props.maxSuggestionsLength,
                this.props.suggestionsFilter
            )
        };
    }

    componentWillReceiveProps(newProps:any) {
        this.setState({
            options: filterSuggestions(
                newProps.query,
                newProps.suggestions,
                newProps.maxSuggestionsLength,
                newProps.suggestionsFilter
            )
        });
    }

    handleMouseDown(item:any, e:any) {
        // focus is shifted on mouse down but calling preventDefault prevents this
        e.preventDefault();
        this.props.addTag(item);
    }

    render() {
        if (!this.props.expandable || !this.state.options.length) {
            return null;
        }

        const options = this.state.options.map((item:any, i:number) => {
            const key = `${this.props.listboxId}-${i}`;
            const classNames = [];

            if (this.props.selectedIndex === i) {
                classNames.push(this.props.classNames.suggestionActive);
            }

            if (item.disabled) {
                classNames.push(this.props.classNames.suggestionDisabled);
            }

            return (
                <li
                    id={key}
                    key={key}
                    role="option"
                    className={classNames.join(" ")}
                    aria-disabled={item.disabled === true}
                    aria-selected="false"
                    aria-controls="ex1-listbox"
                    onMouseDown={this.handleMouseDown.bind(this, item)}
                >
                    <span dangerouslySetInnerHTML={markIt(item.name, this.props.query)} />
                </li>
            );
        });

        return (
            <div className={this.props.classNames.suggestions}>
                <ul role="listbox" id={this.props.listboxId}>
                    {options}
                </ul>
            </div>
        );
    }
}