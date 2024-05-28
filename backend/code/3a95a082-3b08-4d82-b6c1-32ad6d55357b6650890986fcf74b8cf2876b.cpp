#include<bits/stdc++.h>
using namespace std;
#define ll int64_t
#define ho cout<<"YES"<<"\n";
#define nako cout<<"NO"<<"\n";
#define pb push_back
#define all(v) v.begin(),v.end()
#define vll vector<ll>
#define loop(i,n) for(int i=0;i<n;i++)
const char ok='\n';
const ll mod=1e9+7;
/**********************************************************************************/
/*Bit manipulation */
template<typename T> inline T isBitSet(T n, T i){ return (n >> i) & 1; }
template<typename T> inline T isPowerOf2(T n){return n && !(n & (n - 1)); }
template<typename T> inline T getLsb(T val){return val & -val; }
template<typename T> inline T unSetBit(T n, T i){return n & ~(1 << i); }
template<typename T> inline T setBit(T n, T i){ return n | (1 << i); }
template<typename T> inline T flipBit(T n, T i){ return n ^ (1 << i); }
 /*priority_queue*/
template<class T> using max_pq = priority_queue<T>;
template<class T> using min_pq = priority_queue<T, vector<T>, greater<T>>;
/*input-output vector*/
template<typename T>
vector<T> input_vec(const int n){
    vector<T> vec(n);
    for (int i = 0; i < n; i++) cin >> vec[i];
    return vec;
}
template<typename T> 
void disp_vec(const vector<T> &vec){
    for(auto &it: vec) cout << it << " ";
    cout << "\n";
}
/**********************************************************************************/
ll gcd(ll a,ll b)
{
    if(b==0)return a;
    return gcd(b,a%b);
}
void solve()
{
   ll a,b,r,x=0;
   cin>>a>>b>>r;
   bool f=0;
   if(a<b)swap(a,b);
   for(ll i=61;i>=0;i--)
   {
    if((((a>>i)&1)>((b>>i)&1))&&(!f))
    {
      f=1;continue;
    }
    if(f&&(((b>>i)&1)==0)&&(((a>>i)&1)==1)&&((x|(1ll<<i))<=r))
    {
      x=x|(1ll<<i);
    }
   }
  //  cout<<x<<ok;
   a=a^x;
   b=b^x;
   cout<<a-b<<ok;
}
int main()
{
    ios_base :: sync_with_stdio(0);
    cin.tie(nullptr); cout.tie(nullptr);
    int t=1;
    while(t--)
    {
        solve();
    }
}