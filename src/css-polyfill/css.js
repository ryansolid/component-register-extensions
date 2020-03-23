import { NodeFactory, Parser, Stringifier } from 'shady-css-parser-es';

const SLOTTED = /(?:::slotted)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/
const HOST = /(:host)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/
const HOSTCONTEXT = /(:host-context)(?:\(((?:\([^)(]*\)|[^)(]*)+?)\))/
const ATTR_MATCHER = /[\[\(][^)\]]+[\]\)]|:[a-zA-Z0-9_\-]+|([.#]?[a-zA-Z0-9_\-\*]+)/g

// used to approximate shadow dom css encapsulation
class ComponentParser extends NodeFactory {
  constructor(tagName, identifier) {
    super();
    this.tagName = tagName;
    this.identifier = identifier;
  }

  ruleset(selector, rulelist) {
    var part, parts, ref;
    parts = selector.split(',');

    // replace shadow dom selectors
    for (let i = 0, len = parts.length; i < len; i++) {
      part = parts[i];
      if (!(part.indexOf('%') === -1 && !((ref = part.trim()) === 'to' || ref === 'from'))) {
        continue;
      }
      if (this.identifier) {
        part = part.replace(ATTR_MATCHER, (m, c) => {
          if (!c) return m;
          return c + `[${this.identifier}]`;
        });
      }
      if (part.indexOf('::slotted') !== -1) {
        part = part.replace(SLOTTED, (m, expr) => {
          return ` > ${expr}`;
        });
        if (this.identifier) {
          part += `:not([${this.identifier}])`;
        }
      }
      if (!this.tagName) {
        parts[i] = part;
        continue;
      }
      parts[i] = (function() {
        switch (false) {
          case part.indexOf(':host-context') === -1:
            return part.replace(HOSTCONTEXT, (m, c, expr) => {
              return `${this.tagName}${expr}`;
            }) + part.replace(HOSTCONTEXT, (m, c, expr) => {
              return `, ${expr} ${this.tagName}`;
            });
          case part.indexOf(':host(') === -1:
            return part.replace(HOST, (m, c, expr) => {
              return `${this.tagName}${expr}`;
            });
          case part.indexOf(':host') === -1:
            return this.tagName + ' ' + part.replace(':host', '');
          default:
            return part;
        }
      }).call(this);
    }
    selector = parts.join(',');
    return super.ruleset(selector, rulelist);
  }
}

export default function (styles, scope, identifier) {
  const parser = new Parser(new ComponentParser(scope, identifier));
  const parsed = parser.parse(styles);
  return (new Stringifier()).stringify(parsed);
}