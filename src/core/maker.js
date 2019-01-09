import {creatorFactory} from "../factory/creator";
import componentList from './componentList';
import {extend, isUndef, uniqueId} from "./util";

const maker = (() => {

    let _m = {};

    Object.keys(componentList).forEach(key => {
        const component = componentList[key];

        const undef = isUndef(component.maker);

        if (undef || component.maker[component.name] === undefined)
            _m[component.name] = creatorFactory(component.name);

        if (!undef)
            extend(_m, component.maker);
    });

    const commonMaker = creatorFactory('');

    extend(_m, {
        create(type, index) {
            let make = commonMaker('', 'tmp' + uniqueId());
            make.rule.type = type;
            make.rule.index = index;
            make.col({labelWidth: 1});
            return make;
        },
        createTmp(template, vm, index) {
            let make = commonMaker('', 'tmp' + uniqueId());
            make.rule.type = '__tmp';
            make.rule.template = template;
            make.rule.index = index;
            make.rule.vm = vm;
            make.col({labelWidth: 1});
            return make;
        }
    });
    _m.template = _m.createTmp;

    return _m;
})();

export default maker;
