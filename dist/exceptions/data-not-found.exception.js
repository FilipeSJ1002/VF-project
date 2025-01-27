"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class DataNotFoundException extends common_1.NotFoundException {
    constructor(message = 'Dados não encontrados!') {
        super(message);
    }
}
exports.DataNotFoundException = DataNotFoundException;
//# sourceMappingURL=data-not-found.exception.js.map