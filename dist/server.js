var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import personRouter from './person/personRouter.js';
import groupRouter from './group/groupRouter.js';
import { connect } from 'mongoose';
export const app = express();
app.listen(3000, () => {
    console.log('Server is listening on port: ', 3000);
});
app.on('error', e => console.error("Error", e));
app.use(express.json());
app.use('/handler', personRouter);
app.use('/handler', groupRouter);
export function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connect("mongodb://localhost:27017/project");
            console.log("Connected to MongoDB...");
        }
        catch (error) {
            console.error("Error connecting to MongoDB:", error);
        }
    });
}
connectDB();
//# sourceMappingURL=server.js.map