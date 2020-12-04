import _ from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // 現在のユーザー情報
        userInfo: {
            userId: 'mameta',
            userName: 'まめた',
            password: 'mameta',
            // TODO あとでfalseに戻す
            auth: false
        },
        // 登録しているユーザーリスト
        userInfos: [{
            userId: 'mameta',
            userName: 'まめた',
            password: 'mameta',
            // TODO あとでfalseに戻す
            auth: false
        }],
        // 結果
        results: [
            {
                question: String,
                isCorrect: Boolean,
                yourAnswer: String,
                correctAnswer: String
            }
        ],
        // ユーザーのレコード
        records: [{
            userId: String,
            difficulty: String,
            categoryId: String,
            categoryName: String,
            score: Number,
            respondedNumber: Number
        }],
        // モード
        modes: [
            {
                label: 'Easy',
                difficulty: 'easy'
            },
            {
                label: 'Medium',
                difficulty: 'medium'
            },
            {
                label: 'Hard',
                difficulty: 'hard'
            }
        ]
    },
    mutations: {
        /**
         * ユーザー情報を登録する
         * @param state ストアステート
         * @param payload ペイロード
         */
        registerUserInfo (state, payload) {
            if(state.userInfos.some(user => user.userId !== payload.userId)){
                // 新規のユーザーIDの場合、ユーザー情報を登録する
                state.userInfos.push(
                    {
                        userId: payload.userId,
                        userName: payload.userName,
                        password: payload.password,
                        auth: payload.auth
                    }
                )
            } else {
                // すでにユーザーIDが存在する場合、アラートを表示
                window.alert("入力したユーザーIDはすでに存在します")
            }
        },
        /**
         * ストアのユーザー情報を初期化
         * @param state ストアステート
         */
        resetUserInfo(state){
            state.userInfo = Array;
        },
        /**
         * ユーザーの認証をする
         * @param state ストアステート
         * @param payload ペイロード
         */
        authenticateUser(state, payload){
            // ユーザーIDが一致するユーザー情報を取得する
            const user = state.userInfos.find(user => user.userId === payload.userId);
            // ユーザーIDが一致するユーザー情報リストのインデックスを取得する
            const index = state.userInfos.findIndex(user => user.userId === payload.userId);
            if(index !== -1) {
                // 一致するユーザー情報がある場合
                console.log("idが一致するユーザー情報あり")
                if( user.password === payload.password ) {
                    // ストアステートのユーザー情報を更新する
                    console.log("passwardが一致するユーザー情報あり")
                    state.userInfo.userName = payload.Name,
                    state.userInfo.userId = payload.userId,
                    state.userInfo.password = payload.password,
                    // 認証を許可する
                    state.userInfo.auth = true
                }
            } else {
                // 一致するユーザー情報がない場合、アラートを表示する
                window.alert("ユーザー情報が見つかりません。サインアップしてください。")
            }
        },
        /**
         * クイズ結果をストアに保存する
         * @param state ストアステート
         * @param payload ペイロード
         */
        registerResult(state, payload){
            // 
            state.results.push(
                {
                    question: payload.question,
                    isCorrect: payload.isCorrect,
                    yourAnswer: payload.yourAnswer,
                    correctAnswer: payload.correctAnswer
                }
            );
        },
        /**
         * ストアステートの結果をリセットする
         */
        resetResults(state){
            state.results = [];
        },
        /**
         * レコードを上書きする
         * @param state ストアステート
         * @param payload ペイロード
         */
        registerRecord(state, payload) {
            // ユーザーのレコードを取得する
            let recordIndex = _.findIndex(this.state.records, {
                userId: payload.userId,
                difficulty: payload.difficulty,
                categoryId: payload.categoryId
            });
            if (recordIndex===-1){
                // 該当のレコードがない場合、新規レコードを作成する
                console.log("新規レコードを作成します")
                state.records.push(
                    {
                        userId: payload.userId,
                        difficulty: payload.difficulty,
                        categoryId: payload.categoryId,
                        categoryName: payload.categoryName,
                        score: payload.score,
                        respondedNumber: payload.respondedNumber
                    }
                )
            } else {
                // 該当のレコードが存在する場合、レコードを上書きする
                console.log("レコードを上書きします")
                state.records[recordIndex].score += payload.score;
                state.records[recordIndex].respondedNumber += payload.respondedNumber;
            }
        }
    },
    actions: {
        /**
         * ローカルストレージにユーザー情報を保存する
         * @param context コンテキスト
         */
        setLocalStrage(context) {
            localStorage.setItem('userInfo', JSON.stringify(context.state.userInfo));
        },
        /**
         * ローカルストレージからユーザー情報を取得する
         * @param context コンテキスト
         */
        getLocalStrage(context) {
            context.state.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        }
    }
})

export default store;